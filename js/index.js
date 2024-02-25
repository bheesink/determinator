(function () {

    // Variables
    const maxAttendees = 20;

    // Elements
    const manageListScreen = document.querySelector('.manage-list-screen');
    const inputAttendee = document.querySelector('#input-attendee');
    const addAttendeeButton = document.querySelector('#add-attendee-btn')
    const attendeeList = document.querySelector('.attendee-list');
    const slotMachine = document.querySelector('#slot-machine');
    const spinner = document.querySelector('.spinner');
    const boxes = spinner.querySelector('.boxes');

    document.querySelector('#btn-show-spinner').addEventListener('click', initSpinner);
    addAttendeeButton.addEventListener('click', addAttendeeFromInput);

    function initTextInput() {
        inputAttendee.addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                addAttendeeButton.click();
            }
        });
    }

    function dismissAttendee(event) {
        event.currentTarget.classList.toggle("dismissed")
        updateLocalStorage();
    }

    function deleteAttendee(event) {
        event.currentTarget.closest("div").remove();
        updateLocalStorage();
    }

    function addAttendee(attendee) {
        const attendeeName = attendee.name
        const attendeeDismissed = attendee.dismissed

        if (attendeeName) {
            /*
                Add HTML snippet with attendee name
                <div class="attendee-tag">
                    <span class="attendee-remove"></span>
                    <span class="attendee-name">Name</span>
                </div>
            */

            const attendee_tag = document.createElement('div');
            attendee_tag.classList.add('attendee-tag');
            if (attendeeDismissed) {
                attendee_tag.classList.add('dismissed');
            }

            const attendee_remove = document.createElement('span');
            attendee_remove.classList.add('attendee-remove');

            const attendee_name = document.createElement('span');
            attendee_name.classList.add('attendee-name');
            attendee_name.textContent = attendeeName;

            attendee_tag.appendChild(attendee_remove);
            attendee_tag.appendChild(attendee_name);
            attendeeList.insertBefore(attendee_tag, attendeeList.firstChild);
            
            inputAttendee.value = ''
            attendee_tag.addEventListener('click', dismissAttendee);
            attendee_remove.addEventListener('click', deleteAttendee, false);

            updateLocalStorage();
        }
    }

    function addAttendeeFromInput() {
        const attendeeName = inputAttendee.value
        addAttendee({
            name: attendeeName,
            dismissed: false
        })
    }

    function updateLocalStorage() {
        const attendees = attendeeList.querySelectorAll("div.attendee-tag")
        const activeAttendees = []

        attendees.forEach((attendee) => {
            activeAttendees.push({
                name: attendee.querySelector('.attendee-name').textContent,
                dismissed: attendee.classList.contains("dismissed")
            })
        });

        localStorage.setItem('attendees', JSON.stringify(activeAttendees));
    }

    function initSpinner() {
        let active_attendees = [];
        boxes.innerHTML = '';

        manageListScreen.classList.add('inactive');
        slotMachine.classList.remove('inactive');

        const all_attendees = JSON.parse(localStorage.getItem("attendees"));
        let attendees = []

        all_attendees.forEach((attendee) => {
            if (!attendee.dismissed) {
                attendees.push(attendee.name);
            }
        });

        active_attendees.push(...shuffleArray(attendees));

        // Ensure 20 attendees (copy or slice active_attendees)
        if (active_attendees.length >= maxAttendees) {
            active_attendees = active_attendees.slice(0, active_attendees.length - maxAttendees + 1);
        } else {
            let countAttendees = 0;
            for (let i = maxAttendees - 1; i >= 0; i--) {
                if (active_attendees.length >= maxAttendees) {
                    break;
                }
                if (countAttendees > active_attendees.length) {
                    countAttendees = 0;
                }
                active_attendees.push(active_attendees[countAttendees]);
                countAttendees++;
            }
        }

        for (let i = active_attendees.length - 1; i >= 0; i--) {
            const box = document.createElement('div');            
            box.classList.add('box');
            box.textContent = active_attendees[i];
            boxes.appendChild(box);
        }

        // start spinning animation
        boxes.classList.add('spinning');
    }
  
    function shuffleArray([...arr]) {
        let m = arr.length;
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr;
    }  

    function initAttendees() {
        const attendees = JSON.parse(localStorage.getItem("attendees"));
        if (attendees) {
            for (let i = attendees.length - 1; i >= 0; i--) {
                addAttendee(attendees[i])
            }
        }
    }

    function init() {
        initAttendees();
        initTextInput();
    }
        
    init();
  })();
