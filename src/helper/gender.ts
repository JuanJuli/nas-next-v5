export const switchGenderToLabel = (genderCode: string): string => {
    switch (genderCode) {
        case 'M':
            return 'Laki-laki';
        case 'F':
            return 'Perempuan';
        case 'L':
            return 'Laki-laki';
        case 'P':
            return 'Perempuan';
        default:
            return genderCode; // Kembalikan kode asli jika tidak cocok dengan kasus yang ada
    }
}