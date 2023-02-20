import { AuthService } from './../../../services/auth.service';
import { Observable, of } from 'rxjs';
import{AbstractControl,ValidationErrors} from '@angular/forms'
export class LoginValidators{
   
    
   
    static passwordSouldMatch(control : AbstractControl):ValidationErrors|null
    {
        let password=control.get('Rpassword');
        let Cpassword=control.get('Cpassword');
        if(password?.value !== Cpassword?.value){
            return {passwordSouldMatch : true}
        }else{
            return null;
        }
       
    }

     static shouldBeUnique(control : AbstractControl,authService: AuthService) : Promise <ValidationErrors | null>
    {
        let serverUsernames:string[];
        authService.getRegistredUsers().subscribe((resultData: string[]) => {
            serverUsernames= resultData;
          });
          
       //var serverUsernames = ["nada","yassmine","lina"];
        return new Promise((resolve,reject)=>{
            setTimeout(() =>{
                if(serverUsernames.includes(control.value as string)){
                    resolve ({shouldBeUnique : true });
                }
                else resolve( null);
           },2000);
        });
       
       
    }
}
