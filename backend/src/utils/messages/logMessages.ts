import { MailOptions } from "nodemailer/lib/sendmail-transport";

export const logMessages = {
  db: {
    connected: "MongoDB connected",
    mongooseConnected: "Mongoose connected to DB",
    disconnected: "Mongoose disconnected",
    initialConnectionError: "MongoDB connection failed!",
  },
  server: {
    serverRunning: (port: number) => `Server is running on port ${port}`,
    dbConnectionSuccess: "Database connection successful.",
  },
  exceptions: {
    shutdownMessage: "MongoDB connection closed.",
  },
  userApi: {
    signUp: (email: string) => `User registered: ${email}`,
    login: (email: string) => `User logged in: ${email}`,
    logout: (email: string) => `User logged out: ${email}`,
  },
  nodeMailer: {
    nodemailerReady: `[Nodemailer] Ready to send messages using Gamil`,
    mailtrapReady: `[Nodemailer] Ready to send messages using Mailtrap`,
    emailSent: (options: MailOptions) =>
      `Email sent to ${options.to} with subject "${options.subject}"`,
    activateAccount: (appName: string) => `Activate your ${appName} account`,
  },
};
