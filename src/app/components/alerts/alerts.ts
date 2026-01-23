import { Component, inject, signal } from '@angular/core';
import { LogService } from '../../services/log';
import { ServerLog } from '../../models/ServerLog';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-alerts',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  private logService = inject(LogService);

  logs = signal<ServerLog[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  expandedLogId = signal<string | null>(null);

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.logService.getLogs(this.currentPage(), 10).subscribe({
      next: (res) => {
        this.logs.set(res.content);
        this.totalPages.set(res.totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => console.error('Error loading logs:', err),
    });
  }

  changePage(delta: number) {
    const newPage = this.currentPage() + delta;
    if (newPage >= 0 && newPage < this.totalPages()) {
      this.currentPage.set(newPage);
      this.loadLogs();
    }
  }

  toggleDetails(id: string) {
    this.expandedLogId.update((current) => (current === id ? null : id));
  }
}
