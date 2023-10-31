function getNumber(number: string | number, type: string): number {
    if (isNaN(+number)) {
        console.log(`${type}: ${number} is not a number.`);
        return 0;
    }
    return parseInt(number as string);
}

export { getNumber };
