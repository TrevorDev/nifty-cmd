import cp = require('child_process')
let exec = cp.exec

// CMD RUNNER
export default class {
    private childProcess: cp.ChildProcess
    constructor(public cmd: string, public options?) {
      if(!this.options){
        this.options = {
          recordOutput: true,
          log: false,
          onStdErr: null,
          onStdOut: null
        }
      }

      //set logging function
      if(this.options.log){
        this.options.onStdErr = (data)=>{
          process.stdout.write(data);
        },
        this.options.onStdOut = (data)=>{
          process.stdout.write(data);
        }
      }
    }
    run(){
        return new Promise((resolve, reject) => {
          if(this.childProcess){
            //already started
            resolve(false)
            return
          }
          this.childProcess = exec(this.cmd, function(err, stdout, stderr){
              resolve({error: err, stdout: stdout, stderr: stderr})
          })

          this.childProcess.stdout.on('data', (data) => {
            
            if(this.options.onStdOut){
              this.options.onStdOut(data)
            }
          });
          this.childProcess.stderr.on('data', (data) => {
            
            if(this.options.onStdErr){
              this.options.onStdErr(data.toString())
            }
          });
        })
    }

    writeToStdin(text:string){
      if(this.childProcess){
        if(!text){
          this.childProcess.stdin.end()
        }else{
          this.childProcess.stdin.write(text)
        }
      }else{
        throw "Command not started."
      }
    }

    kill(){
      return new Promise((resolve, reject) => {
        if(this.childProcess){
          if(process.platform === 'win32'){
            exec('taskkill /pid '+ this.childProcess.pid + ' /T /F', function(){
              resolve(true)
            })
          }else{
            //not tested on linux or osx yet
            exec('kill -s ' + "SIGKILL" + ' ' + this.childProcess.pid, function(){
              resolve(true)
            })
          }
          this.childProcess = null
        }else{
          resolve(false)
        }
      })
    }
};