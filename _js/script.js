const { createApp } = Vue;
const app = createApp();

app.component('todo_list', {
	data() {
		return {
			active_tab: 1,
			task_name: '',
			task_list: [],
			task_finish: [],
			modify: {
				item: false,
				list: 0
			}
		};
	},
	methods: {
		addTask() { // Ajoute une tâche
			if (this.task_name.length >= 3) {
				this.task_list.push(this.task_name);
				this.task_name = '';
			}
		},
		validateTask(i) {
			this.task_finish.push(this.task_list[i]);
			this.task_list.splice(i, 1);
		},
		moveTask(i) {
			this.task_list.push(this.task_finish[i]);
			this.task_finish.splice(i, 1);
		},
		deleteTask(i) {
			switch (this.active_tab) {
				case 1: // En cours
					this.task_list.splice(i, 1);
				break;

				case 2: // Terminée
					this.task_finish.splice(i, 1);
				break;

				default:
				return;
			}
		},
		modifyTask(i) { // Modifier le nom d'une tâche (A VENIR !)

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

				<ol v-for="(task, i) in task_list">
					<li>
						{{ task }}

						<div>
							<button class="validate_todo" v-on:click.stop.prevent="validateTask(i)"><i class="fa fa-check"></i></button>
							<!--<button class="modify_todo" v-on:click.stop.prevent="modifyTask(i)"><i class="fa fa-pencil"></i></button>-->
							<button class="delete_todo" v-on:click.stop.prevent="deleteTask(i)"><i class="fa fa-trash"></i></button>
						</div>

						<!--<input v-if="modify.item === i" class="modify_Task" type="text" v-model="task_name" placeholder="Nom de la tâche" />-->
					</li>
				</ol>
			</div>

			<div class="list_todo" v-if="active_tab == 2">
				<h2>Terminée</h2>

				<ol v-for="(task, i) in task_finish">
					<li>
						{{ task }}

						<div>
							<button class="move_todo" v-on:click.stop.prevent="moveTask(i)"><i class="fa fa-arrow-left"></i></button>
							<!--<button class="modify_todo" v-on:click.stop.prevent="modifyTask(i)"><i class="fa fa-pencil"></i></button>-->
							<button class="delete_todo" v-on:click.stop.prevent="deleteTask(i)"><i class="fa fa-trash"></i></button>
						</div>

						<!--<input v-if="modify.item === i" class="modify_Task" type="text" v-model="task_name" placeholder="Nom de la tâche" />-->
					</li>
				</ol>
			</div>
		</div>
	`
});

app.mount('#app');