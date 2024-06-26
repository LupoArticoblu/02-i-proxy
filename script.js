//la reattività di vue non funziona in plain js. analizziamo il caso:
let a0 = 1;
let a1 = 3;
let a2 = a0 + a1;

console.log(a2);// 4

a0 = 5;// cambiando il valore di a0, a2 rimane 4

console.log(a2); // perchè rimarra in memoria il primo valore di addizione

//ATTENZIONE: Non esiste un meccanismo per tracciare la lettura e la scrittura di variabili locali in plain JavaScript.

//js per essere reattivo ha bisogno di un meccanismo per tracciare i valori in memoria. questo meccanismo è chiamato PROXY.

//PROXY: il valore di una variabile locale o di una variabile globale in js viene tracciato in memoria per l'utente.

CONST = { createApp } = Vue;

createApp({
  data() {
    return{
      ValentinaTanzi:{
        nome: 'Valentina',
        cognome: 'Tanzi',
        eta: 30
      },
      clock: '',
    }
  },
  methods: {
    //metodi e funzioni
    getClock() {
      //costante con nuovo oggetto Date
      const date = new Date();
      //attribuisco a clock il template literal di date coi metodi
      this.clock = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
    startClock() {
      //nel metodo startClock faccio partire il setInterval
      setInterval(()=> {
        //array function(perchè this fa casino) in cui passo la funzione getClock
        this.getClock()
      }, 1000);
    }
  },
  //altri metodi di createApp in vue
  created() {
    //inserisco qui le azioni che voglio scatenare all' inizializzazione delle options
    console.log('app creata');
    //richiamo getClock
    this.getClock();
  },
  //inserisco il metodo mounted
  mounted(){
    //inserisco qui le azioni che voglio scatenare al caricamento dell'app: per esempio le funzioni da richiamare
    console.log('app caricata');
    //richiamo e monto startClock
    this.startClock();
    
    console.log(this.ValentinaTanzi); //ci restituirà un proxy(object) con tutte le variabili contenute nell'oggetto ValentinaTanzi
  },
}).mount('#app');
