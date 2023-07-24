(function(){"use strict";var e={919:function(e,t,a){var r=a(9242),o=a(3396),i=a(7139);const s={class:"weather-app-container"},n={key:0},h={key:0},l={key:1},c={key:1};function d(e,t,a,r,d,u){const m=(0,o.up)("AutoComplete"),p=(0,o.up)("PreloaderSpinner"),y=(0,o.up)("WeatherBlock"),v=(0,o.up)("TemperatureGraph"),g=(0,o.up)("ModalConfirm");return(0,o.wg)(),(0,o.iD)("div",s,[(0,o._)("h1",null,(0,i.zw)(e.$t("message.title")),1),(0,o._)("div",null,[(0,o._)("button",{onClick:t[0]||(t[0]=(...e)=>u.showWeatherTab&&u.showWeatherTab(...e)),class:(0,i.C_)({"active-tab":"weather"===d.currentTab})},(0,i.zw)(e.$t("message.weather")),3),(0,o._)("button",{onClick:t[1]||(t[1]=(...e)=>u.showFavoritesTab&&u.showFavoritesTab(...e)),class:(0,i.C_)({"active-tab":"favorites"===d.currentTab})},(0,i.zw)(e.$t("message.favorites")),3)]),(0,o._)("div",null,[(0,o._)("button",{onClick:t[2]||(t[2]=e=>u.changeLanguage("en")),class:(0,i.C_)({"active-tab":"en"===u.activeLanguage})},"English",2),(0,o._)("button",{onClick:t[3]||(t[3]=e=>u.changeLanguage("uk")),class:(0,i.C_)({"active-tab":"uk"===u.activeLanguage})},"Українська",2)]),"weather"===d.currentTab?((0,o.wg)(),(0,o.iD)("div",n,[(0,o._)("div",null,[((0,o.wg)(),(0,o.j4)(m,{key:d.autocompleteKey,onSelected:u.addWeatherBlock,"can-add-weather-block":d.canAddWeatherBlock,ref:"autoComplete"},null,8,["onSelected","can-add-weather-block"]))]),d.loadingWeather?((0,o.wg)(),(0,o.iD)("div",h,[(0,o.Wm)(p)])):((0,o.wg)(),(0,o.iD)("div",l,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(d.weatherData,(t=>((0,o.wg)(),(0,o.iD)("div",{key:t.cityName},[(0,o.Wm)(y,{cityWeather:t,onRemoveBlock:e.removeWeatherBlock,onToggleFavorite:u.toggleFavoriteCity,isFavorite:u.isFavoriteCity(t.cityName)},null,8,["cityWeather","onRemoveBlock","onToggleFavorite","isFavorite"]),((0,o.wg)(),(0,o.j4)(v,{key:t.cityName+(e.isWeekGraph?"-week":"-day"),hourlyTemperatures:e.isWeekGraph?t.weeklyHourlyTemperatures:t.hourlyTemperatures},null,8,["hourlyTemperatures"]))])))),128))]))])):"favorites"===d.currentTab?((0,o.wg)(),(0,o.iD)("div",c,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(d.favoriteCities,(t=>((0,o.wg)(),(0,o.iD)("div",{key:t.cityName},[(0,o.Wm)(y,{cityWeather:t,onToggleFavorite:e=>u.toggleFavoriteCity(t.cityName),isFavorite:!0,showRemoveButton:!0,onRemoveFavorite:e=>d.showRemoveFavoriteModal(t.cityName)},null,8,["cityWeather","onToggleFavorite","onRemoveFavorite"]),((0,o.wg)(),(0,o.j4)(v,{key:t.cityName+(e.isWeekGraph?"-week":"-day"),hourlyTemperatures:e.isWeekGraph?t.weeklyHourlyTemperatures:t.hourlyTemperatures},null,8,["hourlyTemperatures"]))])))),128))])):(0,o.kq)("",!0),d.showModal||d.showRemoveFavoriteModal||d.showAddWeatherErrorModal?((0,o.wg)(),(0,o.j4)(g,{key:2,show:d.showModal||d.showRemoveFavoriteModal||d.showAddWeatherErrorModal,message:d.modalMessage||d.removeFavoriteModalMessage||d.weatherErrorModalMessage,onConfirm:u.onConfirmModal,onCancel:u.onCancelModal},null,8,["show","message","onConfirm","onCancel"])):(0,o.kq)("",!0)])}a(7658);const u={class:"autocomplete"},m=["placeholder"];function p(e,t,a,s,n,h){return(0,o.wg)(),(0,o.iD)("div",u,[(0,o.wy)((0,o._)("input",{type:"text",placeholder:e.$t("autocomplete.placeholder"),"onUpdate:modelValue":t[0]||(t[0]=e=>n.cityName=e),onInput:t[1]||(t[1]=(...e)=>h.debouncedHandleInput&&h.debouncedHandleInput(...e)),onKeydown:[t[2]||(t[2]=(0,r.D2)(((...e)=>h.highlightNext&&h.highlightNext(...e)),["down"])),t[3]||(t[3]=(0,r.D2)(((...e)=>h.highlightPrevious&&h.highlightPrevious(...e)),["up"])),t[4]||(t[4]=(0,r.D2)(((...e)=>h.selectCity&&h.selectCity(...e)),["enter"]))]},null,40,m),[[r.nr,n.cityName]]),h.canAddWeatherBlock?((0,o.wg)(),(0,o.iD)("button",{key:0,onClick:t[5]||(t[5]=(...e)=>h.addWeatherBlock&&h.addWeatherBlock(...e))},(0,i.zw)(e.$t("autocomplete.addButton")),1)):(0,o.kq)("",!0),n.showDropdown?((0,o.wg)(),(0,o.iD)("ul",{key:1,ref:"dropdown",onClick:t[6]||(t[6]=(...e)=>h.selectCity&&h.selectCity(...e))},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(h.filteredSuggestions,((e,t)=>((0,o.wg)(),(0,o.iD)("li",{key:t,class:(0,i.C_)({highlighted:t===n.highlightedIndex})},(0,i.zw)(e.city)+", "+(0,i.zw)(e.country),3)))),128))],512)):(0,o.kq)("",!0)])}var y={data(){return{cityName:"",suggestions:[],showDropdown:!1,highlightedIndex:-1,debounceTimer:null}},computed:{filteredSuggestions(){const e=this.getUniqueSuggestions();return e},canAddWeatherBlock(){return this.$parent.weatherData.length<6}},methods:{async handleInput(){if(this.cityName.length>0)try{const e=encodeURIComponent(this.cityName),t=await fetch(`https://api.openweathermap.org/data/2.5/find?q=${e}&appid=17dc71bb4ac06ea33cab56e5935c72a3`);if(!t.ok)throw new Error("City not found");const a=await t.json();this.suggestions=a.list.map((e=>({city:e.name,country:e.sys.country}))),this.showDropdown=!0,this.highlightedIndex=-1}catch(e){console.error("Error fetching city suggestions:",e),this.suggestions=[],this.showDropdown=!1}else this.suggestions=[],this.showDropdown=!1},debouncedHandleInput(){clearTimeout(this.debounceTimer),this.debounceTimer=setTimeout(this.handleInput,300)},highlightNext(){this.highlightedIndex<this.filteredSuggestions.length-1&&this.highlightedIndex++},highlightPrevious(){this.highlightedIndex>0&&this.highlightedIndex--},selectCity(){this.canAddWeatherBlock&&this.addWeatherBlock()},getUniqueSuggestions(){const e={},t=[];for(const a of this.suggestions)e[a.country]||(e[a.country]=!0,t.push(a));return t},addWeatherBlock(){this.$parent.addWeatherBlock(this.cityName),this.cityName=""}}},v=a(89);const g=(0,v.Z)(y,[["render",p]]);var w=g;const k={class:"city-name"},f={key:2},C={key:3};function b(e,t,a,r,s,n){const h=(0,o.up)("WeatherCard"),l=(0,o.up)("TemperatureGraph"),c=(0,o.up)("ModalConfirm");return(0,o.wg)(),(0,o.iD)("div",{class:(0,i.C_)(["weather-block",{favorited:a.isFavorite}])},[(0,o._)("p",k,(0,i.zw)(n.cityDisplayName),1),a.cityWeather?((0,o.wg)(),(0,o.j4)(h,{key:0,cityName:a.cityWeather.cityName,temperature:a.cityWeather.temperature,weatherDescription:a.cityWeather.weatherDescription,humidity:a.cityWeather.humidity,windSpeed:a.cityWeather.windSpeed,pressure:a.cityWeather.pressure,hourlyTemperatures:a.cityWeather.hourlyTemperatures},null,8,["cityName","temperature","weatherDescription","humidity","windSpeed","pressure","hourlyTemperatures"])):(0,o.kq)("",!0),a.cityWeather?((0,o.wg)(),(0,o.j4)(l,{key:1,hourlyTemperatures:a.cityWeather.hourlyTemperatures},null,8,["hourlyTemperatures"])):(0,o.kq)("",!0),a.showRemoveButton?((0,o.wg)(),(0,o.iD)("div",f,[(0,o._)("button",{onClick:t[0]||(t[0]=(...e)=>n.confirmRemove&&n.confirmRemove(...e))},(0,i.zw)(e.$t("message.remove")),1)])):(0,o.kq)("",!0),a.showFavoriteButton?((0,o.wg)(),(0,o.iD)("div",C,[(0,o._)("button",{onClick:t[1]||(t[1]=(...e)=>n.toggleFavorite&&n.toggleFavorite(...e))},(0,i.zw)(a.isFavorite?e.$t("message.removeFromFavorites"):e.$t("message.addToFavorites")),1)])):(0,o.kq)("",!0),s.showModal?((0,o.wg)(),(0,o.j4)(c,{key:4,show:s.showModal,message:e.$t("message.confirmRemove"),onConfirm:n.onConfirmRemove,onCancel:n.closeModal},null,8,["show","message","onConfirm","onCancel"])):(0,o.kq)("",!0)],2)}const M={class:"weather-card"},T={class:"weather-info"},W={class:"temperature"},D={class:"description"},F={class:"humidity"},S={class:"wind"},B={class:"pressure"};function N(e,t,a,r,s,n){return(0,o.wg)(),(0,o.iD)("div",M,[(0,o._)("div",T,[(0,o._)("div",W,(0,i.zw)(e.$t("message.temperature"))+(0,i.zw)(a.temperature)+" °C",1),(0,o._)("div",D,(0,i.zw)(e.$t("weatherDescriptions."+a.weatherDescription)),1),(0,o._)("div",F,(0,i.zw)(e.$t("message.humidity"))+(0,i.zw)(a.humidity)+" %",1),(0,o._)("div",S,(0,i.zw)(e.$t("message.wind"))+(0,i.zw)(a.windSpeed)+(0,i.zw)(e.$t("message.windValue")),1),(0,o._)("div",B,(0,i.zw)(e.$t("message.pressure"))+(0,i.zw)(a.pressure)+" "+(0,i.zw)(e.$t("message.pressureValue")),1)])])}var R={props:{cityName:{type:String,required:!0},temperature:{type:Number,required:!0},weatherDescription:{type:String,required:!0},humidity:{type:Number,required:!0},windSpeed:{type:Number,required:!0},pressure:{type:Number,required:!0}}};const A=(0,v.Z)(R,[["render",N]]);var K=A;function _(e,t,a,r,i,s){return(0,o.wg)(),(0,o.iD)("div",null,[((0,o.wg)(),(0,o.iD)("canvas",{ref:"chartCanvas",key:e.chartKey}))])}var $=a(1632);$.kL.register($.jn,$.od,$.f$,$.Dx);var j=(0,o.aZ)({props:{hourlyTemperatures:{type:Array,required:!0}},data(){return{chartKey:0,chart:null}},mounted(){this.createChart()},methods:{createChart(){this.chart&&this.chart.destroy();const e=this.$refs.chartCanvas.getContext("2d"),t=this.hourlyTemperatures.map((e=>e.time)),a=this.hourlyTemperatures.map((e=>e.temperature));this.chart=new $.kL(e,{type:"line",data:{labels:t,datasets:[{label:"Temperature (°C)",data:a,backgroundColor:"rgba(75, 192, 192, 0.2)",borderColor:"rgba(75, 192, 192, 1)",borderWidth:1}]},options:this.chartOptions})},generateLabels(e){const t=[],a=24-e.getHours();for(let r=0;r<=a;r++){const a=new Date(e);a.setHours(e.getHours()+r),t.push(a.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}))}return t}},computed:{chartOptions(){return{responsive:!0,scales:{x:{ticks:{display:!0}},y:{beginAtZero:!0,title:{display:!0,text:"Temperature (°C)"}}}}}}});const z=(0,v.Z)(j,[["render",_]]);var L=z;const q={key:0,class:"modal-overlay"},x={class:"modal"},O={class:"modal-content"};function P(e,t,a,r,s,n){return a.show?((0,o.wg)(),(0,o.iD)("div",q,[(0,o._)("div",x,[(0,o._)("div",O,[(0,o._)("p",null,(0,i.zw)(a.message),1),(0,o._)("button",{onClick:t[0]||(t[0]=(...e)=>n.onCancel&&n.onCancel(...e)),class:"modal-cancel-button"},(0,i.zw)(e.$t("modal.cancel")),1),(0,o._)("button",{onClick:t[1]||(t[1]=(...e)=>n.onConfirm&&n.onConfirm(...e)),class:"modal-confirm-button"},(0,i.zw)(e.$t("modal.confirm")),1)])])])):(0,o.kq)("",!0)}var V={props:{show:{type:Boolean,required:!0},message:{type:String,required:!0}},methods:{onConfirm(){this.$emit("confirm")},onCancel(){this.$emit("cancel")}}};const E=(0,v.Z)(V,[["render",P]]);var I=E,Z={components:{WeatherCard:K,TemperatureGraph:L,ModalConfirm:I},props:{cityWeather:{type:Object,required:!0},isFavorite:{type:Boolean,default:!1},showRemoveButton:{type:Boolean,default:!0},showFavoriteButton:{type:Boolean,default:!0}},data(){return{showModal:!1,modalMessage:"Are you sure you want to remove this?"}},methods:{confirmRemove(){this.showModal=!0},onConfirmRemove(){this.isFavorite?this.$emit("remove-favorite",this.cityWeather.cityName):this.$emit("remove-block",this.cityWeather.cityName),this.closeModal()},closeModal(){this.showModal=!1},toggleFavorite(){this.$emit("toggle-favorite",this.cityWeather.cityName)}},computed:{cityDisplayName(){if(this.cityWeather.cityName){const e=this.$t(`cityNames.${this.cityWeather.cityName}`);return e!==`cityNames.${this.cityWeather.cityName}`?e:this.cityWeather.cityName}return""}}};const G=(0,v.Z)(Z,[["render",b]]);var H=G;const Y={class:"preloader"},U=(0,o._)("div",{class:"preloader-spinner"},null,-1),J=[U];function Q(e,t){return(0,o.wg)(),(0,o.iD)("div",Y,J)}const X={},ee=(0,v.Z)(X,[["render",Q]]);var te=ee,ae={components:{WeatherBlock:H,AutoComplete:w,ModalConfirm:I,PreloaderSpinner:te},data(){return{currentTab:"weather",weatherData:[],favoriteCities:[],showModal:!1,modalMessage:"",showRemoveFavoriteModal:!1,removeFavoriteModalMessage:"",cityToRemoveFromFavorites:"",showAddWeatherErrorModal:!1,weatherErrorModalMessage:"You can't add more than 5 weather blocks. Remove a weather block to add a new one.",autocompleteKey:0,defaultCityData:{cityName:"Kiev",temperature:"",weatherDescription:"",humidity:"",windSpeed:"",pressure:"",hourlyTemperatures:[],isWeatherFavorited:!1},canAddWeatherBlock(){return this.weatherData.length<5},loadingWeather:!1,loadingFavorites:!1}},methods:{async addWeatherBlock(e){try{this.loadingWeather=!0;const t=encodeURIComponent(e),a=await fetch(`https://api.openweathermap.org/data/2.5/find?q=${t}&appid=17dc71bb4ac06ea33cab56e5935c72a3`);if(!a.ok)throw new Error("City not found");const r=await a.json(),o=r.list[0],i=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${t}&appid=17dc71bb4ac06ea33cab56e5935c72a3`),s=await i.json(),n=new Date,h=n.getTime(),l=s.list.filter((e=>{const t=new Date(e.dt_txt).getTime();return t>=h&&t<=h+864e5})),c=l.map((e=>{const t=new Date(e.dt_txt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),a=this.convertKelvinToCelsius(e.main.temp);return{time:t,temperature:a}}));this.weatherData.push({cityName:o.name,temperature:this.convertKelvinToCelsius(o.main.temp),weatherDescription:o.weather[0].description,humidity:o.main.humidity,windSpeed:o.wind.speed,pressure:o.main.pressure,hourlyTemperatures:c,isWeatherFavorited:!1}),this.autocompleteKey+=1,console.log("hourlyTemperatures:",c),this.loadingWeather=!1}catch(t){this.loadingWeather=!1,this.showModal=!0,this.modalMessage="Oops! Enter the correct city name."}},addWeatherBlockButton(){if(this.weatherData.length>=5)return this.showModal=!0,void(this.modalMessage="You can't add more than 5 weather blocks. Remove a weather block to add a new one.");this.weatherData.push({cityName:"New City",temperature:"",weatherDescription:"",humidity:"",windSpeed:"",pressure:"",hourlyTemperatures:[],isWeatherFavorited:!1}),this.autocompleteKey+=1},removeFavoriteCity(e){const t=this.favoriteCities.findIndex((t=>t.cityName===e));if(-1!==t){this.favoriteCities.splice(t,1);const a=this.weatherData.find((t=>t.cityName===e));a&&(a.isWeatherFavorited=!1)}},async toggleFavoriteCity(e){try{this.loadingFavorites=!0;const t=this.favoriteCities.findIndex((t=>t.cityName===e));if(-1!==t)this.favoriteCities.splice(t,1);else if(this.favoriteCities.length>=5)this.showModal=!0,this.modalMessage="You can't add more than 5 favorite cities. Remove a city from favorites to add a new one.";else{const t=this.weatherData.find((t=>t.cityName===e));t&&this.favoriteCities.push(t)}this.loadingFavorites=!1}catch(t){this.loadingFavorites=!1,this.showModal=!0,this.modalMessage="Oops! Something went wrong while updating favorites."}},isFavoriteCity(e){return this.favoriteCities.some((t=>t.cityName===e))},showWeatherTab(){this.currentTab="weather"},showFavoritesTab(){this.currentTab="favorites"},closeModal(){this.showModal=!1,this.modalMessage=""},convertKelvinToCelsius(e){return(e-273.15).toFixed(0)},onConfirmModal(){this.showModal?this.closeModal():this.showRemoveFavoriteModal?this.removeFavoriteCity():this.showAddWeatherErrorModal&&this.closeAddWeatherErrorModal()},onCancelModal(){this.showModal?this.closeModal():this.showRemoveFavoriteModal?this.closeRemoveFavoriteModal():this.showAddWeatherErrorModal&&this.closeAddWeatherErrorModal()},closeAddWeatherErrorModal(){this.showAddWeatherErrorModal=!1,this.weatherErrorModalMessage=""},switchToDayGraph(){this.isWeekGraph=!1},switchToWeekGraph(){this.isWeekGraph=!0},changeLanguage(e){this.$i18n.locale=e}},mounted(){this.addWeatherBlock("Kiev");const e=localStorage.getItem("favoriteCities");e&&(this.favoriteCities=JSON.parse(e))},computed:{activeLanguage(){return"en"===this.$i18n.locale?"en":"uk"}},watch:{favoriteCities:{handler(){localStorage.setItem("favoriteCities",JSON.stringify(this.favoriteCities))},deep:!0}}};const re=(0,v.Z)(ae,[["render",d]]);var oe=re,ie={message:{title:"Weather App",weather:"Weather",favorites:"Favorites",switchToDayGraph:"Switch to Day Graph",switchToWeekGraph:"Switch to Week Graph",city:"City: ",remove:"Remove",addToFavorites:"Add to Favorites",removeFromFavorites:"Remove from Favorites",confirmRemove:"Are you sure you want to remove this?",temperature:"temperature: ",humidity:"Humidity: ",wind:"Wind: ",pressure:"Pressure: ",windValue:"km/h",pressureValue:" hPa"},weatherDescriptions:{"clear sky":"Clear Sky","few clouds":"Few Clouds","scattered clouds":"Scattered Clouds","broken clouds":"Broken Clouds","shower rain":"Shower Rain",rain:"Rain",thunderstorm:"Thunderstorm",snow:"Snow",mist:"Mist",smoke:"Smoke",haze:"Haze","sand/ dust whirls":"Sand/Dust Whirls",fog:"Fog",sand:"Sand",dust:"Dust","volcanic ash":"Volcanic Ash",squalls:"Squalls",tornado:"Tornado","overcast clouds":"Overcast Clouds"},cityNames:{Kyiv:"Kyiv",London:"London",Paris:"Paris",Berlin:"Berlin",Rome:"Rome",Madrid:"Madrid",Moscow:"Moscow",Minsk:"Minsk",Warsaw:"Warsaw",Prague:"Prague",Vienna:"Vienna",Bucharest:"Bucharest",Budapest:"Budapest",Sofia:"Sofia",Brussels:"Brussels",Amsterdam:"Amsterdam",Stockholm:"Stockholm",Helsinki:"Helsinki",Oslo:"Oslo",Copenhagen:"Copenhagen",Dublin:"Dublin",Zagreb:"Zagreb",Athens:"Athens",Lisbon:"Lisbon",Bern:"Bern",Luxembourg:"Luxembourg",Reykjavik:"Reykjavik",Riga:"Riga",Vilnius:"Vilnius",Tallinn:"Tallinn",Valletta:"Valletta",Ljubljana:"Ljubljana",Bratislava:"Bratislava",Monaco:"Monaco",SanMarino:"San Marino",Vatican:"Vatican",Andorra:"Andorra",Tirana:"Tirana",Sarajevo:"Sarajevo",Podgorica:"Podgorica",Skopje:"Skopje",Pristina:"Pristina",Belgrade:"Belgrade",Chisinau:"Chisinau",Tbilisi:"Tbilisi",Yerevan:"Yerevan",Baku:"Baku",Ankara:"Ankara",Tashkent:"Tashkent",Ashgabat:"Ashgabat",Dushanbe:"Dushanbe",Khartoum:"Khartoum",Astana:"Astana",Kharkiv:"Kharkiv",Donetsk:"Donetsk",Odessa:"Odessa",Lviv:"Lviv",Zaporizhia:"Zaporizhia",KryvyiRih:"Kryvyi Rih",Mykolaiv:"Mykolaiv",Mariupol:"Mariupol",Luhansk:"Luhansk",Vinnytsia:"Vinnytsia",Simferopol:"Simferopol",Kherson:"Kherson",Poltava:"Poltava",Chernihiv:"Chernihiv",Cherkasy:"Cherkasy",Sumy:"Sumy",Zhytomyr:"Zhytomyr",Khmelnytskyi:"Khmelnytskyi",Rivne:"Rivne",Kropyvnytskyi:"Kropyvnytskyi",Ternopil:"Ternopil"},autocomplete:{placeholder:"Enter a city name",addButton:"+"},modal:{confirm:"Confirm",cancel:"Cancel"}},se={message:{title:"Погодний додаток",weather:"Погода",favorites:"Вибране",switchToDayGraph:"Переключитися на графік за день",switchToWeekGraph:"Переключитися на графік за тиждень",city:"Місто: ",remove:"Видалити",addToFavorites:"Додати в обрані",removeFromFavorites:"Видалити з обраних",confirmRemove:"Ви впевнені, що хочете видалити це?",temperature:"Температура: ",humidity:"Вологість: ",wind:"Вітер: ",pressure:"Тиск: ",windValue:" км/год",pressureValue:" мм.рт.ст."},weatherDescriptions:{"clear sky":"Ясний небо","few clouds":"Малохмарно","scattered clouds":"Розсіяні хмари","broken clouds":"Розірвані хмари","shower rain":"Зливи",rain:"Дощ",thunderstorm:"Гроза",snow:"Сніг",mist:"Туман",smoke:"Дим",haze:"Димка","sand/ dust whirls":"Піщана / пилова вихора",fog:"Туман",sand:"Пісок",dust:"Пил","volcanic ash":"Вулканічний попіл",squalls:"Шквали",tornado:"Торнадо","overcast clouds":"Хмарно"},cityNames:{Kyiv:"Київ",London:"Лондон",Paris:"Париж",Berlin:"Берлін",Rome:"Рим",Madrid:"Мадрид",Moscow:"Москва",Minsk:"Мінськ",Warsaw:"Варшава",Prague:"Прага",Vienna:"Відень",Bucharest:"Бухарест",Budapest:"Будапешт",Sofia:"Софія",Brussels:"Брюссель",Amsterdam:"Амстердам",Stockholm:"Стокгольм",Helsinki:"Гельсінкі",Oslo:"Осло",Copenhagen:"Копенгаген",Dublin:"Дублін",Zagreb:"Загреб",Athens:"Афіни",Lisbon:"Лісабон",Bern:"Берн",Luxembourg:"Люксембург",Reykjavik:"Рейк`явік",Riga:"Рига",Vilnius:"Вільнюс",Tallinn:"Таллінн",Valletta:"Валлетта",Ljubljana:"Любляна",Bratislava:"Братислава",Monaco:"Монако",SanMarino:"Сан-Марино",Vatican:"Ватикан",Andorra:"Андорра",Tirana:"Тирана",Sarajevo:"Сараєво",Podgorica:"Подгориця",Skopje:"Скоп`є",Pristina:"Приштина",Belgrade:"Белград",Chisinau:"Кишинів",Tbilisi:"Тбілісі",Yerevan:"Єреван",Baku:"Баку",Ankara:"Анкара",Tashkent:"Ташкент",Ashgabat:"Ашгабат",Dushanbe:"Душанбе",Khartoum:"Хартум",Astana:"Астана",Kharkiv:"Харків",Donetsk:"Донецьк",Odessa:"Одеса",Lviv:"Львів",Zaporizhia:"Запоріжжя",KryvyiRih:"Кривий Ріг",Mykolaiv:"Миколаїв",Mariupol:"Маріуполь",Luhansk:"Луганськ",Vinnytsia:"Вінниця",Simferopol:"Сімферополь",Kherson:"Херсон",Poltava:"Полтава",Chernihiv:"Чернігів",Cherkasy:"Черкаси",Sumy:"Суми",Zhytomyr:"Житомир",Khmelnytskyi:"Хмельницький",Rivne:"Рівне",Kropyvnytskyi:"Кропивницький",Ternopil:"Тернопіль"},autocomplete:{placeholder:"Введіть назву міста",addButton:"+"},modal:{confirm:"Підтвердити",cancel:"Скасувати"}},ne=a(5658);const he=(0,ne.o)({locale:"en",messages:{en:ie,uk:se}});(0,r.ri)(oe).use(he).mount("#app")}},t={};function a(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,a),i.exports}a.m=e,function(){var e=[];a.O=function(t,r,o,i){if(!r){var s=1/0;for(c=0;c<e.length;c++){r=e[c][0],o=e[c][1],i=e[c][2];for(var n=!0,h=0;h<r.length;h++)(!1&i||s>=i)&&Object.keys(a.O).every((function(e){return a.O[e](r[h])}))?r.splice(h--,1):(n=!1,i<s&&(s=i));if(n){e.splice(c--,1);var l=o();void 0!==l&&(t=l)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[r,o,i]}}(),function(){a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,{a:t}),t}}(),function(){a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};a.O.j=function(t){return 0===e[t]};var t=function(t,r){var o,i,s=r[0],n=r[1],h=r[2],l=0;if(s.some((function(t){return 0!==e[t]}))){for(o in n)a.o(n,o)&&(a.m[o]=n[o]);if(h)var c=h(a)}for(t&&t(r);l<s.length;l++)i=s[l],a.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return a.O(c)},r=self["webpackChunkweather_app"]=self["webpackChunkweather_app"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=a.O(void 0,[998],(function(){return a(919)}));r=a.O(r)})();
//# sourceMappingURL=app.11dc95d3.js.map