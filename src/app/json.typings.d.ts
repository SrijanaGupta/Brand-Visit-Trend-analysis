// because by default Angular does not read the json file //
declare module "*.json" {
    const value: any;
    export default value;
    }