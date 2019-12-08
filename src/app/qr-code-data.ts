/**
 * Matches JSON strucure of QR code information which is passed by HTTP from AWS
 */
export class QrCodeData {
    title: string;
    hasTextContent: boolean;
    contentText: string;
}
