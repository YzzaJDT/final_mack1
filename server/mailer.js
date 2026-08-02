import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
    if (transporter) return transporter;

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        return null;
    }

    transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    return transporter;
}

export async function sendConsultationNotice({ consultant, inviteeName, inviteeEmail, startTime }) {
    const mailer = getTransporter();

    if (!mailer || !consultant.email) {
        console.warn(
            `[mailer] Skipping notification to ${consultant.name}: SMTP or consultant email not configured.`
        );
        return;
    }

    const when = new Date(startTime).toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
    });

    await mailer.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: consultant.email,
        subject: `New consultation booked with you: ${inviteeName}`,
        text:
            `${inviteeName} (${inviteeEmail}) just booked a consultation with you.\n\n` +
            `When: ${when}\n`,
    });
}
