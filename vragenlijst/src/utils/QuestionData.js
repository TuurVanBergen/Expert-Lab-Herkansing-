const questions = [
	{
		text: "Wil je dat we je stemming proberen af te leiden via gezichtsherkenning?",
		category: "biometrische analyse",
		insight:
			"Detectie van emotie via gezichtsuitdrukkingen — kan onbewust emotionele staten en mentale gezondheid blootleggen.",
		source:
			"https://en.wikipedia.org/wiki/Emotion_recognition, https://businesslawtoday.org/2024/09/emotional-ai-privacy-manipulation-bias-risks/",
		risk_level: "high",
		impact:
			"Kan leiden tot profiling op basis van emotionele toestand, wat gebruikt kan worden in commerciële beïnvloeding",
		dark_pattern: {
			type: "confirmshaming",
			description: "Gebruiker voelt zich schuldig als hij/zij weigert.",
			triggered_if: "Gebruiker kiest 'Nee'",
		},
	},
	{
		text: "Ben je er niet op tegen dat deze installatie eventueel probeert te detecteren met wie je je mogelijk bevindt?",
		category: "sociale detectie",
		insight:
			"Analyse van omgevingspersonen via computer vision of sensoren — kan sociale netwerken en aanwezigheidspatronen blootleggen.",
		source:
			"https://en.wikipedia.org/wiki/Computer_vision, https://vision.soic.indiana.edu/papers/bystander2020oakland.pdf",
		risk_level: "high",
		impact:
			"Geeft gevoelige data over met wie iemand omgaat, wat relaties en sociale structuren kan verraden.",
		dark_pattern: {
			type: "misleidende_taal_dubbele_negatie",
			description:
				"Vraag is zo geformuleerd dat gebruikers sneller akkoord gaan doordat 'nee' verwarrend werkt in context van dubbele negatie.",
			triggered_if:
				"Gebruiker antwoordt 'Ja' terwijl intentie mogelijk 'Nee' was.",
		},
	},
	{
		text: "Mag deze installatie je stem analyseren?",
		category: "spraakanalyse",
		insight:
			"Analyse van spraak kan emoties, accent, gezondheidstoestand en unieke stem-ID onthullen.",
		source:
			"https://en.wikipedia.org/wiki/Speaker_recognition, https://pmc.ncbi.nlm.nih.gov/articles/PMC7928859, https://www.rinf.tech/voice-recognition-and-security-balancing-convenience-and-privacy/",
		risk_level: "low",
		impact:
			"Stemprints kunnen worden gebruikt als biometrisch identificatiemiddel en zijn moeilijk te wijzigen als ze uitlekken.",
		dark_pattern: {
			type: "obstructie",
			description:
				"De 'Nee'-knop is minder zichtbaar of moeilijker klikbaar, waardoor weigeren lastiger wordt.",
			triggered_if:
				"Gebruiker kiest 'Ja' mogelijk door moeilijkheid om 'Nee' te selecteren.",
		},
	},
	{
		text: "Mag deze installatie je interacties delen met een derde partij voor analyse?",
		category: "datadeling",
		insight:
			"Doorgeven van interactiedata aan externe entiteiten — mogelijk zonder dat gebruiker weet wie deze derden zijn.",
		source:
			"https://en.wikipedia.org/wiki/Third-party_data, https://lawsocietyonline.com/third-party-data-sharing/",
		risk_level: "medium",
		impact:
			"Verlies van controle over data, risico op hergebruik in marketing, profiling of verkoop van persoonsgegevens.",
		dark_pattern: {
			type: "time pressure",
			description:
				"Gebruiker krijgt slechts 5 seconden om te antwoorden, daarna wordt automatisch 'Ja' gekozen.",
			triggered_if: "Gebruiker reageert niet binnen de tijdslimiet.",
		},
	},

	{
		text: "Ben jij iemand die liever routines volgt dan verrassingen omarmt?",
		category: "persoonlijkheid",
		insight:
			"Je voorkeur voor routines kan inzicht geven in je voorspelbaarheid en kwetsbaarheid voor manipulatie of marketingstrategieën.",
		source: "https://en.wikipedia.org/wiki/Big_Five_personality_traits",
		risk_level: "medium",
	},
	{
		text: "Lach je vaker uit beleefdheid dan om iets écht grappigs?",
		category: "sociaal gedrag",
		insight:
			"Door te analyseren wanneer je lacht, kan men je sociale aanpassingsvermogen en gevoeligheid voor sociale druk inschatten.",

		source: "https://en.wikipedia.org/wiki/Emotional_labor",
		risk_level: "low",
	},
	{
		text: "Heb je soms het gevoel dat je wordt bekeken, ook als je alleen bent?",
		category: "privacy-bewustzijn",
		insight:
			"Dit geeft een indicatie van hoe bewust je bent van surveillance en welke persoonlijke routines mogelijk kunnen worden gevolgd.",

		source: "https://en.wikipedia.org/wiki/Surveillance",
		risk_level: "high",
	},
	{
		text: "Voel jij je vaker verbonden met machines dan met mensen?",
		category: "technologievoorkeur",
		insight:
			"Deze vraag onthult je afhankelijkheid van technologie, wat kan worden gebruikt om je digitale gedrag en voorkeuren te voorspellen.",

		source: "https://en.wikipedia.org/wiki/Technophilia",
		risk_level: "medium",
	},
	{
		text: "Ben je sneller geneigd iets te geloven als het mooi gepresenteerd is?",
		category: "cognitieve bias",
		insight:
			"Deze informatie kan worden gebruikt om te voorspellen hoe gemakkelijk je beïnvloedbaar bent door visuele marketing of misleidende informatie.",
		source: "https://en.wikipedia.org/wiki/Aesthetic%E2%80%93usability_effect",
		risk_level: "medium",
	},
	{
		text: "Verander je van mening als de meerderheid iets anders vindt?",
		category: "groepsdruk",
		insight:
			"Door te weten hoe gevoelig je bent voor groepsdruk, kan men inschatten hoe je beslissingen in sociale of professionele contexten beïnvloedbaar zijn.",
		source: "https://en.wikipedia.org/wiki/Asch_conformity_experiments",
		risk_level: "high",
	},
	{
		text: "Denk je vaak dat mensen je gedrag analyseren?",
		category: "privacy-bewustzijn",
		insight:
			"Dit kan aangeven hoe zelfbewust je bent en welke persoonlijke patronen anderen mogelijk kunnen volgen of misbruiken.",
		source: "https://en.wikipedia.org/wiki/Surveillance",
		risk_level: "high",
	},
	{
		text: "Is eerlijk zijn belangrijker dan aardig zijn?",
		category: "morele oriëntatie",
		insight:
			"Deze vraag kan blootleggen welke ethische keuzes je maakt, informatie die gebruikt kan worden voor sociale of psychologische profilering.",

		source:
			"https://en.wikipedia.org/wiki/Kohlberg%27s_stages_of_moral_development",
		risk_level: "low",
	},
	{
		text: "Hou je ervan om gecontroleerd te worden, zolang het duidelijk is?",
		category: "toezichtsacceptatie",
		insight:
			"Dit onthult je tolerantie voor toezicht, wat kan worden gebruikt om je reactie op monitoring of tracking te voorspellen.",
		source: "https://en.wikipedia.org/wiki/Stanford_prison_experiment",
		risk_level: "high",
	},
	{
		text: "Herinner je je liever dan dat je opzoekt?",
		category: "cognitieve voorkeur",
		insight:
			"Deze vraag geeft inzicht in hoe afhankelijk je bent van technologie versus intern geheugen, wat kan worden gebruikt om je digitale gedrag te analyseren.",

		source: "https://en.wikipedia.org/wiki/Extended_mind_thesis",
		risk_level: "medium",
	},
];

export default questions;
