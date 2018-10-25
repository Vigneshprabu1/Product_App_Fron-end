
import {Service} from 'react-services-injector';

class Data extends Service {
    constructor() {
      super();
              this.data = "Hello data from HttpService";
        this.getData = this.getData.bind(this);
        this.setData=this.setData.bind(this);
      }
    
    getData(){
        return this.data;
      }
      setData(q){
        this.data=q;
       
      }
    }  
    


  //"publicName" property is important if you use any kind of minimization on your JS
  Data.publicName = 'Data';
   
  export default Data;
  
