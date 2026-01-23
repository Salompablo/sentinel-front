export interface SystemStatusDto {
    serverName: string;
    region: string;
    cpuUsage: number;
    memUsage: number;
    status: 'CRITICAL' | 'STABLE';
    latestError: string,
    dateTime: string;
}
