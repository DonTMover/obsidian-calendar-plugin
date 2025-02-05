import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile, TFolder } from 'obsidian';
import { DateTime } from 'luxon';

interface CalendarSettings {
	dateFormat: string;
	notesFolder: string;
}

const DEFAULT_SETTINGS: CalendarSettings = {
	dateFormat: 'yyyy-MM-dd',
	notesFolder: 'Daily Notes'
}

export default class SimpleCalendarPlugin extends Plugin {
	settings: CalendarSettings;

	async onload() {
		await this.loadSettings();

		// Create ribbon icon for quick note creation
		const ribbonIconEl = this.addRibbonIcon('calendar', 'Create Daily Note', async () => {
			const result = await this.createDailyNote();
			new Notice(result ? 'Daily note created!' : 'Note already exists!');
		});
		ribbonIconEl.addClass('calendar-ribbon');

		// Add command for creating daily notes
		this.addCommand({
			id: 'create-daily-note',
			name: 'Create daily note',
			callback: async () => {
				const result = await this.createDailyNote();
				new Notice(result ? 'Daily note created!' : 'Note already exists!');
			}
		});

		// Add settings tab
		this.addSettingTab(new CalendarSettingTab(this.app, this));
	}

	async createDailyNote(): Promise<boolean> {
		const dateString = DateTime.now().toFormat(this.settings.dateFormat);
		const filename = `${dateString}.md`;
		const folderPath = this.settings.notesFolder;
		
		// Create folder if not exists
		if (!this.app.vault.getFolderByPath(folderPath)) {
			await this.app.vault.createFolder(folderPath);
		}

		// Check if file already exists
		const fullPath = `${folderPath}/${filename}`;
		const existingFile = this.app.vault.getAbstractFileByPath(fullPath);
		if (existingFile instanceof TFile) {
			return false;
		}

		// Create new file with template
		const template = `# ${dateString}\n\n## Tasks\n- [ ] `;
		await this.app.vault.create(fullPath, template);
		return true;
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class CalendarSettingTab extends PluginSettingTab {
	plugin: SimpleCalendarPlugin;

	constructor(app: App, plugin: SimpleCalendarPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl('h2', { text: 'Calendar Settings' });

		// Date format setting
		new Setting(containerEl)
			.setName('Date format')
			.setDesc('Choose preferred date format (using Luxon format)')
			.addDropdown(dropdown => dropdown
				.addOption('yyyy-MM-dd', 'ISO (2023-01-01)')
				.addOption('dd-MM-yyyy', 'European (01-01-2023)')
				.addOption('MM/dd/yyyy', 'American (01/01/2023)')
				.addOption('yyyy/MM/dd', 'Japanese (2023/01/01)')
				.setValue(this.plugin.settings.dateFormat)
				.onChange(async (value) => {
					this.plugin.settings.dateFormat = value;
					await this.plugin.saveSettings();
				}));

		// Folder path setting
		new Setting(containerEl)
			.setName('Storage folder')
			.setDesc('Path where daily notes will be stored')
			.addText(text => text
				.setPlaceholder('Example: Daily Notes/2023')
				.setValue(this.plugin.settings.notesFolder)
				.onChange(async (value) => {
					this.plugin.settings.notesFolder = value;
					await this.plugin.saveSettings();
				}));
	}
}
