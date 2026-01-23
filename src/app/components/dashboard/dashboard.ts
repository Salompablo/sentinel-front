import { Component, inject, signal } from '@angular/core';
import { WebSocketService } from '../../services/websocket';
import { AIService } from '../../services/ai';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  wsService = inject(WebSocketService);
  aiService = inject(AIService);

  analyzingStates = signal<Set<string>>(new Set());

  analysisResults = new Map<string, string>();

  isAnalyzing(serverName: string): boolean {
    return this.analyzingStates().has(serverName);
  }

  analyzeIssue(metrics: any) {
    if (!metrics.latestError) return;

    this.analyzingStates.update((set) => {
      const newSet = new Set(set);
      newSet.add(metrics.serverName);
      return newSet;
    });

    this.aiService.analyzeError(metrics.latestError).subscribe({
      next: (res) => {
        const analysisText = res.analysis;

        this.analysisResults.set(metrics.serverName, analysisText);

        if (metrics.latestLogId) {
          this.aiService.saveAnalysis(metrics.latestLogId, analysisText).subscribe({
            next: () => console.log('✅ Analysis saved succesfully'),
            error: (e) => console.error('❌ Error saving the analysis:', e),
          });
        }

        this.analyzingStates.update((set) => {
          const newSet = new Set(set);
          newSet.delete(metrics.serverName);
          return newSet;
        });
      },
      error: (err) => {
        console.error(err);
        this.analyzingStates.update((set) => {
          const newSet = new Set(set);
          newSet.delete(metrics.serverName);
          return newSet;
        });
      },
    });
  }

  closeAnalysis(serverName: string) {
    this.analysisResults.delete(serverName);
  }
}
