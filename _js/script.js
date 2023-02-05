const { createApp } = Vue;
const app = createApp();

app.component('todo_list', {
	data() {
		return {
			active_tab: 1,
			task_name: '',
			task_list: {
				'task': [] // Tableau contenant des tableaux à 2 entrées => [index 0 == nom | index 1 == status]
			},
			task_modify: '',
			before_modify: '',
			modify: false
		};
	},
	methods: {
		addTask() { // Ajoute une tâche
			if (this.task_name != '') {
				this.task_list.task.push([this.task_name, 0]); // Ajoute le tableau avec un status 0 par défaut
				this.task_name = ''
			}
		},
		validateTask(i) {
			if (!this.modify) {
				this.task_list.task[i][1] = 1
			}
		},
		moveTask(i) {
			if (!this.modify) {
				this.task_list.task[i][1] = 0
			}
		},
		deleteTask(i) {
			if (!this.modify) {
				this.task_list.task.splice(i, 1);
			}
		},
		modifyTask(i) {	
			if (this.task_modify == '') {
				this.modify = i;
			} else {
				if (this.modify == i && this.task_modify != '') {
					this.before_modify = this.task_list.task[i][0];
					this.task_list.task[i][0] = this.task_modify;
					this.refresh();
				}
			}			
		},
		cancelModifyTask(i) {

		},
		refresh() {
			this.modify = false;
			this.task_name = '';
			this.task_modify = '';
			this.before_modify = '';
		}
	},
	template: `
		<div class="form_todo">
			<div class="tab_select">
				<div>
					<button
						v-bind:class="active_tab == 1 ? 'active' : ''"
						v-on:click.stop.prevent="active_tab = 1"
					>
						En cours
					</button>

					<button
						v-bind:class="active_tab == 2 ? 'active' : ''"
						v-on:click.stop.prevent="active_tab = 2"
					>
						Terminée
					</button>
				</div>

				<form methods="post" class="form_addTask">
					<input type="text" v-model="task_name" placeholder="Nom de la tâche" />
					<button v-on:click.stop.prevent="addTask"><i class="fa fa-plus"></i></button>
				</form>
			</div>			

			<div class="list_todo" v-if="active_tab == 1">
				<h2>En cours</h2>

				<ol v-for="(task, i) in task_list.task">
					<li v-if="task[1] == 0">
						{{ task[0] }}

						<div>
							<button class="validate_todo" v-on:click.stop.prevent="validateTask(i)"><i class="fa fa-check"></i></button>
							<button class="modify_todo" v-on:click.stop.prevent="modifyTask(i)"><i class="fa fa-pencil"></i></button>
							<button class="delete_todo" v-on:click.stop.prevent="deleteTask(i)"><i class="fa fa-trash"></i></button>
						</div>

						<div v-if="modify === i" class="rename_todo">
							<input v-model="task_modify" class="modify_Task" type="text" placeholder="Nouveau nom" />
							<!--<button class="cancel" c-on:click.stop.prevent="cancelModifyTask(i)"><i class="fa fa-xmark"></i></button>-->
							<button class="accept" v-on:click.stop.prevent="modifyTask(i)"><i class="fa fa-check"></i></button>
						</div>
					</li>
				</ol>
			</div>

			<div class="list_todo" v-if="active_tab == 2">
				<h2>Terminée</h2>

				<ol v-for="(task, i) in task_list.task">
					<li v-if="task[1] == 1">
						{{ task[0] }}

						<div>
							<button class="move_todo" v-on:click.stop.prevent="moveTask(i)"><i class="fa fa-arrow-left"></i></button>
							<button class="modify_todo" v-on:click.stop.prevent="modifyTask(i)"><i class="fa fa-pencil"></i></button>
							<button class="delete_todo" v-on:click.stop.prevent="deleteTask(i)"><i class="fa fa-trash"></i></button>
						</div>

						<div v-if="modify === i" class="rename_todo">
							<input v-model="task_modify" class="modify_Task" type="text" placeholder="Nouveau nom" />
							<!--<button class="cancel" c-on:click.stop.prevent="cancelModifyTask(i)"><i class="fa fa-xmark"></i></button>-->
							<button class="accept" v-on:click.stop.prevent="modifyTask(i)"><i class="fa fa-check"></i></button>
						</div>
					</li>
				</ol>
			</div>
		</div>
	`
});

app.mount('#app');