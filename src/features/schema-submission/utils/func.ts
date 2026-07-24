interface ErrorResponse {
    message: string
    type: string
    title?: string
}

// array of strings
export const switchErrorDistributionReq: (message: string) => ErrorResponse = (message) => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("is not yet defined")) {
        return { message: "Mohon hubungi admin LSP", type: "modal", title: "Konfigurasi Persyaratan Belum Lengkap" };
    }

    switch (lowerMessage) {
        case "internal server error:there is already join request":
            return { message: "Anda sudah mengajukan sertifikasi yang sama.", type: "modal", title: "Sudah Pernah Mengajukan Skema Sertifikasi" };
        case "internal server error:there is already join assessment":
            return { message: "Anda sudah terdaftar diasesmen, silahkan hubungi Admin LSP!", type: "notification" };
        default:
            return { message: "Gagal mengajukan skema sertifikasi", type: "notification", title: "Kesalahan" };
    }
}