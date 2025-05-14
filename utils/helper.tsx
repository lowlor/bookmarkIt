export function ensure<T>(argument : T | undefined | null, message : string = 'error in ensure') : T{
    if(argument === undefined || argument === null){
        throw new TypeError(message)
    }

    return argument;
}