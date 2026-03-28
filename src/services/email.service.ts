import nodemailer, { Transporter } from 'nodemailer';
import { env } from '../config/env';
import logger from '../logging/logger';

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  /**
   * Send an email. Logs errors but does not throw so callers are not blocked.
   */
  async send(to: string, subject: string, html: string): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: env.SMTP_FROM,
        to,
        subject,
        html,
      });
      logger.info(`Email sent to ${to}`);
      return true;
    } catch (err) {
      logger.error('Failed to send email', { to, subject, error: (err as Error).message });
      return false;
    }
  }

  private getTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      bug: 'Bug Report',
      feature_request: 'Feature Request',
      general: 'General Feedback',
    };
    return labels[type] || type;
  }

  private getTypeColor(type: string): { bg: string; text: string; icon: string } {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
      bug: { bg: '#FEF2F2', text: '#991B1B', icon: '&#9888;' },
      feature_request: { bg: '#EFF6FF', text: '#1E40AF', icon: '&#10024;' },
      general: { bg: '#F0FDF4', text: '#166534', icon: '&#9993;' },
    };
    return colors[type] || colors.general;
  }

  private formatDate(): string {
    return new Date().toLocaleDateString('en-PH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  /**
   * Notification email sent to the dev/creator when new feedback is submitted.
   */
  async sendFeedbackNotification(
    feedbackType: string,
    subject: string,
    description: string,
    senderEmail: string | null
  ): Promise<boolean> {
    if (!env.DEV_EMAIL) return false;

    const typeStyle = this.getTypeColor(feedbackType);
    const typeLabel = this.getTypeLabel(feedbackType);
    const date = this.formatDate();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#F1F5F9;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F1F5F9;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0F172A 0%,#1E3A5F 50%,#0F172A 100%);padding:32px 40px;text-align:center;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="text-align:center;">
                  <div style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:50px;padding:6px 20px;margin-bottom:16px;">
                    <span style="color:#FCD34D;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">GovPH Tracker</span>
                  </div>
                  <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">New Feedback Received</h1>
                  <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">${date}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Type Badge -->
        <tr>
          <td style="padding:28px 40px 0;">
            <table role="presentation" cellspacing="0" cellpadding="0">
              <tr>
                <td style="background:${typeStyle.bg};border-radius:8px;padding:10px 18px;">
                  <span style="color:${typeStyle.text};font-size:13px;font-weight:700;letter-spacing:0.5px;">${typeStyle.icon}&nbsp; ${typeLabel}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Subject -->
        <tr>
          <td style="padding:20px 40px 0;">
            <h2 style="margin:0;color:#0F172A;font-size:20px;font-weight:700;line-height:1.4;">${subject}</h2>
          </td>
        </tr>

        <!-- Meta Info -->
        <tr>
          <td style="padding:20px 40px 0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F8FAFC;border-radius:8px;border:1px solid #E2E8F0;">
              <tr>
                <td style="padding:16px 20px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="padding-bottom:8px;">
                        <span style="color:#64748B;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">From</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span style="color:#0F172A;font-size:15px;font-weight:600;">${senderEmail || '<span style="color:#94A3B8;font-style:italic;">Anonymous</span>'}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Description -->
        <tr>
          <td style="padding:24px 40px 0;">
            <p style="margin:0 0 8px;color:#64748B;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Message</p>
            <div style="background:#FFFBEB;border-left:4px solid #F59E0B;border-radius:0 8px 8px 0;padding:20px;margin:0;">
              <p style="margin:0;color:#1E293B;font-size:15px;line-height:1.7;">${description}</p>
            </div>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:32px 40px 0;">
            <div style="border-top:1px solid #E2E8F0;"></div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px 32px;text-align:center;">
            <p style="margin:0;color:#94A3B8;font-size:12px;line-height:1.6;">
              This is an automated notification from <strong style="color:#64748B;">GovPH Tracker</strong>.<br />
              You are receiving this because you are listed as the project maintainer.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    return this.send(env.DEV_EMAIL, `[${typeLabel}] ${subject}`, html);
  }

  /**
   * Reply email sent by admin to the feedback sender.
   */
  async sendFeedbackReply(to: string, feedbackSubject: string, message: string): Promise<boolean> {
    const date = this.formatDate();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#F1F5F9;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F1F5F9;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0F172A 0%,#1E3A5F 50%,#0F172A 100%);padding:32px 40px;text-align:center;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="text-align:center;">
                  <div style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:50px;padding:6px 20px;margin-bottom:16px;">
                    <span style="color:#FCD34D;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">GovPH Tracker</span>
                  </div>
                  <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.3px;">We've Responded to Your Feedback</h1>
                  <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">${date}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Subject Reference -->
        <tr>
          <td style="padding:28px 40px 0;">
            <p style="margin:0 0 4px;color:#64748B;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Regarding</p>
            <h2 style="margin:0;color:#0F172A;font-size:18px;font-weight:700;line-height:1.4;">${feedbackSubject}</h2>
          </td>
        </tr>

        <!-- Reply Message -->
        <tr>
          <td style="padding:24px 40px 0;">
            <div style="background:#F0FDF4;border-left:4px solid #22C55E;border-radius:0 8px 8px 0;padding:20px;margin:0;">
              <p style="margin:0;color:#1E293B;font-size:15px;line-height:1.7;">${message}</p>
            </div>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding:32px 40px 0;">
            <div style="border-top:1px solid #E2E8F0;"></div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 40px 32px;text-align:center;">
            <p style="margin:0;color:#94A3B8;font-size:12px;line-height:1.6;">
              This message was sent by the <strong style="color:#64748B;">GovPH Tracker</strong> team.<br />
              Thank you for helping us improve our services.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

    return this.send(to, `Re: ${feedbackSubject}`, html);
  }
}
