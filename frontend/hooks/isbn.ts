export function isValidIsbn10(isbn: string) {
    const digits = isbn.replace(/[-\s]/g, "");
    if (!/^\d{9}[\dXx]$/.test(digits)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += Number(digits[i]) * (10 - i);
    }

    const last = digits[9].toUpperCase();
    sum += last === "X" ? 10 : Number(last);

    return sum % 11 === 0;
}

export function isValidIsbn13(isbn: string) {
    const digits = isbn.replace(/[-\s]/g, "");
    if (!/^\d{13}$/.test(digits)) return false;

    let sum = 0;
    for (let i = 0; i < 12; i++) {
    sum += Number(digits[i]) * (i % 2 === 0 ? 1 : 3);
    }

    const check = (10 - (sum % 10)) % 10;
    return check === Number(digits[12]);
}

