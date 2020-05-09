// 特殊说明：你可能有很多reducer，type一定要是全局唯一的，一般通过prefix来修饰实现。
// 栗子：counter/INCREMENT里的counter就是他所有type的前缀。
export const INCREMENT = 'counter/INCREMENT'
export const DECREMENT = 'counter/DECREMENT'
export const RESET = 'counter/RESET'

// action创建函数，主要是返回一个action类，action类有个type属性，来决定执行哪一个reducer。
export function increment () {
    return {
        type: INCREMENT
    }
}

export function decrement () {
    return {
        type: DECREMENT
    }
}

export function reset () {
    return {
        type: RESET
    }
}