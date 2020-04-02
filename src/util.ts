export function comma(num: number): string {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function commaSign(num: number): string {
    let str = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    if (num >= 0) {
        str = '+' + str;
    }
    return str;
}

export function pctChange(oldVal: number, newVal: number): string {
    const pct = Math.round(100 * (newVal - oldVal) / oldVal);
    if (isNaN(pct)) {
        return '-';
    }
    return commaSign(pct) + '%';
}