export class ProjectUrl {
  static external(value: string): string {
    const normalized = value.trim();
    if (!normalized) return '';
    return this.httpUrl(normalized, 'Project external URL');
  }

  static video(value?: string): string | undefined {
    const normalized = value?.trim();
    if (!normalized) return undefined;
    if (normalized.startsWith('/uploads/')) return normalized;
    if (/^data:video\/[\w.+-]+;base64,/.test(normalized)) return normalized;
    return this.httpUrl(normalized, 'Project video URL');
  }

  private static httpUrl(value: string, field: string): string {
    try {
      const url = new URL(value);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error();
      return value;
    } catch {
      throw new Error(`${field} must be a valid HTTP(S) URL`);
    }
  }
}
