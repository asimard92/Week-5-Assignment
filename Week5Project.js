class Pocketmonster {
    constructor(name, type) {
        this.name = name; 
        this.type = type;
    }

    describe() {
        return `${this.name} 's type is ${this.type}.`; 
    }
}

class Roster {
    constructor(name) {
        this.name = name; 
        this.pocketmonsters = [];
    }

    addPocketmonster(pocketmonster) {
        if (pocketmonster instanceof Pocketmonster) {
            this.pocketmonsters.push(pocketmonster);
        } else {
            throw new Error(`You may only enter a name of a Pokemon. Argument is not a Pokemon: ${pocketmonster}`)
        }
    }

    describe() {
        return `${this.name} has ${this.pocketmonsters.length} pocketmonsters.`;
    }
}

class Menu {
    constructor() {
        this.rosters = [];
        this.selectedRoster = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection !=0) {
            switch (selection) {
                case "1": 
                this.createRoster();
                break;
                case "2":
                this.viewRoster();
                break;
                case "3":
                this.deleteRoster();
                break;
                case "4":
                this.displayRosters();
                break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert("Goodbye Trainer!")
    }

    showMainMenuOptions() {
        return prompt (`
        0) Exit
        1) Create New Roster
        2) View Rosters
        3) Delete Roster
        4) Display All Rosters 
        `);
    }

    showRosterMenuOptions(rosterInfo){
        return prompt(`
        0) Back 
        1) Add Pocketmonster
        2) Remove Pocketmonster
        ------------------------
        ${rosterInfo}
        `);
    }

    displayRosters () {
        let rosterString = ""; 
        for (let i = 0; i < this.rosters.length; i++) {
            rosterString += i+ ") " + this.rosters[i].name + "\n";
        }
        alert(rosterString);
    }

    createRoster () {
        let name = prompt("Enter a name for your new roster: ");
        this.rosters.push(new Roster(name));
    }

    viewRoster(){
        let index = prompt("Enter the index of the roster you would like to view: ");
        if (index > -1 && index < this.rosters.length) {
            this.selectedRoster = this.rosters[index];
            let description = "Roster Name: " + this.selectedRoster.name + "\n";

            for (let i = 0; i < this.selectedRoster.pocketmonsters.length; i++){
                description += i + ") " + this.selectedRoster.pocketmonsters[i].name + " - " 
                + this.selectedRoster.pocketmonsters[i].type + "\n";
            }

            let selection = this.showRosterMenuOptions(description);
            switch (selection) {
                case "1":
                    this.createPocketmonster();
                    break;
                case "2":
                    this.deletePocketmonster();
            }
        }
    }
     
    deleteRoster() {
        let index = prompt("Enter the index of the roster you wish to delete: ");
        if (index > -1 && index < this.rosters.length) {
        this.rosters.splice(index,1);
        }
    }
    createPocketmonster() {
        let name = prompt("Enter Pocketmonster name: ");
        let type = prompt("Enter the Pocketmonsters type: ");
        this.selectedRoster.pocketmonsters.push(new Pocketmonster(name, type));
    }

    deletePocketmonster() {
        let index = prompt("Enter the index of the Pocketmonster you wish to remove: ");
        if (index > -1 && index < this.selectedRoster.pocketmonsters.length) {
            this.selectedRoster.pocketmonsters.splice(index,1);
        }
    }
}

let menu = new Menu ();
menu.start(); 
