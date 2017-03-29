export default class  {
    cmd: string;
    options: any;
    private childProcess;
    constructor(cmd: string, options?: any);
    run(): Promise<{}>;
    writeToStdin(text: string): void;
    kill(): Promise<{}>;
}
