(function () {

    const attendeeList = document.querySelector('.attendee-list');
    const slotMachine = document.querySelector('#slot-machine');
    const spinner = document.querySelector('.spinner');
    const boxes = spinner.querySelector('.boxes');
    const maxAttendees = 20;

    document.querySelector('#btn-go').addEventListener('click', spin);

    function getAttendees() {
        const attendees = attendeeList.querySelectorAll("input[type='checkbox']")
        const checkedAttendees = []

        attendees.forEach((attendee) => {
            if (attendee.checked) {
                checkedAttendees.push(attendee.value)
            }
        });
        
        return checkedAttendees;
    }

    function spin() {

        let pool = [];
        boxes.innerHTML = '';

        attendeeList.classList.add('inactive');
        slotMachine.classList.remove('inactive');

        const attendees = getAttendees()
        pool.push(...shuffleArray(attendees));
  
        // Ensure 20 attendees (copy or slice pool)
        if (pool.length >= maxAttendees) {
            pool = pool.slice(0, pool.length - maxAttendees + 1);
        } else {
            let countAttendees = 0;
            for (let i = maxAttendees - 1; i >= 0; i--) {
                if (pool.length >= maxAttendees) {
                    break;
                }
                if (countAttendees > pool.length) {
                    countAttendees = 0;
                }
                pool.push(pool[countAttendees]);
                countAttendees++;
            }
        }        

        for (let i = pool.length - 1; i >= 0; i--) {
            const box = document.createElement('div');            
            box.classList.add('box');
            box.textContent = pool[i];
            boxes.appendChild(box);
        }

        boxes.classList.add('spinning');

        boxes.addEventListener('animationend', () => {
            boxes.lastChild.classList.add('blink');
        });
    }
  
    function shuffleArray([...arr]) {
        let m = arr.length;
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr;
    }  

  })();
