import { User } from '../../src/js/user.module.js';

const CountdownViewer = {
    name : 'countdown-viewer',
    data() {
        return {
            User : new User,
        }
    },
    methods: {
        countDown(){
            const releaseDate = new Date('November 08, 2023 19:00:00').getTime();
        
            // Get the current date and time
            const presentDate = new Date().getTime();
        
            // Calculate the remaining time until the release
            const gap = releaseDate - presentDate;
        
            // Define constants for time units in milliseconds
            const second = 1000;
            const minute = 60 * second;
            const hour = 60 * minute;
            const day = 24 * hour;
        
            // Calculate the remaining days, hours, minutes, and seconds
            const dayText = Math.floor(gap / day);
            let hourText = Math.floor((gap % day) / hour);
            const minuteText = Math.floor((gap % hour) / minute);
            const secondText = Math.floor((gap % minute) / second);
        
            // Add leading zero to hours if less than 10
            if (hourText < 10) {
                hourText = '0' + hourText;
            }
        
            // Update the HTML elements with the countdown values
            document.querySelector('.day').textContent = dayText;
            document.querySelector('.hour').textContent = hourText;
            document.querySelector('.minute').textContent = minuteText;
            document.querySelector('.second').textContent = secondText;
        }
    },
    mounted() {
        this.countDown();
        
        // Set up a recurring timer to update the this.countdown every second
        setInterval(this.countDown, 1000);
    },
    template : `
        <div class="container">
            <h1>coming soon!</h1>
        
            <div class="countdown">
                <!-- day -->
                <div class="day-container">
                    <h2 class="day">1</h2>
                    <p>Días</p>
                </div>
            
                <!-- hours -->
                <div class="hour-container">
                    <h2 class="hour">24</h2>
                    <p>Horas</p>
                </div>
            
                <!-- minutes -->
                <div class="minute-container">
                    <h2 class="minute">59</h2>
                    <p>Minutos</p>
                </div>
            
                <!-- seconds -->
                <div class="second-container">
                    <h2 class="second">59</h2>
                    <p>Segundos</p>
                </div>
            </div>
        </div>
    `,
}

export { CountdownViewer } 