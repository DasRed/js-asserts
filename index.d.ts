declare module "assert" {
    function internal(expr: boolean, message?: string | Function, code?: number | Function, constructor?: Function): void;
    namespace internal {
        function isTrue(value: boolean, message?: string | Function, code?: number | Function, constructor?: Function): void;
        function isFalse(value: boolean, message?: string | Function, code?: number | Function, constructor?: Function): void;
        function includes(value: any, array: any[] | Object, message?: string | Function, code?: number | Function, constructor?: Function): void;
        function isEmpty(value: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
        function isNil(value: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
        function hasKey(key: string, object: Object, message?: string | Function, code?: number | Function, constructor?: Function): void;
        function isEqual(a: any, b: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
        function isGreaterOrEqual(a: any, b: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
        function isGreater(a: any, b: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
        function isLessOrEqual(a: any, b: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
        function isLess(a: any, b: any, message?: string | Function, code?: number | Function, constructor?: Function): void;

        namespace not {
            function isTrue(value: boolean, message?: string | Function, code?: number | Function, constructor?: Function): void;
            function isFalse(value: boolean, message?: string | Function, code?: number | Function, constructor?: Function): void;
            function includes(value: any, array: any[] | Object, message?: string | Function, code?: number | Function, constructor?: Function): void;
            function isEmpty(value: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
            function isNil(value: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
            function hasKey(key: string, object: Object, message?: string | Function, code?: number | Function, constructor?: Function): void;
            function isEqual(a: any, b: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
            function isGreaterOrEqual(a: any, b: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
            function isGreater(a: any, b: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
            function isLessOrEqual(a: any, b: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
            function isLess(a: any, b: any, message?: string | Function, code?: number | Function, constructor?: Function): void;
        }
    }

    export = internal;
}
