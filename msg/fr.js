var MSG = {
  title: "Code4Kids - proof of concept",
  blocks: "Blocs",
  linkTooltip: "Sauvegarder et lier aux blocs.",
  runTooltip: "Lancer le programme défini par les blocs dans l’espace de travail.",
  badCode: "Erreur du programme :\n%1",
  timeout: "Nombre maximum d’itérations d’exécution dépassé.",
  trashTooltip: "Jeter tous les blocs.",
  catLogic: "Logique",
  catLoops: "Boucles",
  catMath: "Math",
  catText: "Texte",
  catLists: "Listes",
  catColour: "Couleur",
  catVariables: "Variables",
  catFunctions: "Fonctions",
  listVariable: "liste",
  textVariable: "texte",
  httpRequestError: "Il y a eu un problème avec la demande.",
  linkAlert: "Partagez vos blocs grâce à ce lien:\n\n%1",
  hashError: "Désolé, '%1' ne correspond à aucun programme sauvegardé.",
  xmlError: "Impossible de charger le fichier de sauvegarde.  Peut être a t-il été créé avec une autre version de Blockly?",
  badXml: "Erreur d’analyse du XML :\n%1\n\nSélectionner 'OK' pour abandonner vos modifications ou 'Annuler' pour continuer à modifier le XML.",

  // CyaNn Code
  catImage: "Images",
  catGame: "Jeu",
  catActor: "Acteur",
};

// object
Blockly.Msg.OBJECT_CONSTRUCTOR = "constructeur";
Blockly.Msg.OBJECT_PROPERTIES = "propriétés";
Blockly.Msg.OBJECT_METHODS = "méthodes";
Blockly.Msg.OBJECT_EVENTS = "événements";

// actor
Blockly.Msg.BLOCK_CREATE = "créer";
Blockly.Msg.BLOCK_GAME = "le jeu";
Blockly.Msg.BLOCK_WITH = "avec";
Blockly.Msg.BLOCK_X_TO = "x à";
Blockly.Msg.BLOCK_Y_TO = "y à";
Blockly.Msg.BLOCK_W_TO = "la largeur à";
Blockly.Msg.BLOCK_H_TO = "la hauteur à";
Blockly.Msg.BLOCK_WIDTH = "la largeur";
Blockly.Msg.BLOCK_HEIGHT = "la longueur";
Blockly.Msg.BLOCK_GET = "obtenir";
Blockly.Msg.BLOCK_SET = "definir";
Blockly.Msg.BLOCK_TO = "à";
Blockly.Msg.BLOCK_IN = "en";
Blockly.Msg.BLOCK_DO = "faire";
Blockly.Msg.BLOCK_WHEN = "quand";
Blockly.Msg.BLOCK_ONCE = "une fois seulement";
Blockly.Msg.BLOCK_MOUSE_IN = "la sourie en";
Blockly.Msg.BLOCK_DEBUG = "débogue";
Blockly.Msg.BLOCK_VALUE_OF = "la valeur de";
Blockly.Msg.PRINT = "écrit";
Blockly.Msg.AT = "à";
Blockly.Msg.TEXT = "le text";

Blockly.Msg.BLOCK_SECONDS = "seconds";

Blockly.Msg.BLOCK_VELOCITY = "velocité en";
Blockly.Msg.BLOCK_GRAVITY = "gravité en";
Blockly.Msg.BLOCK_ANGLE = "angle";
Blockly.Msg.BLOCK_DISTANCE = "distance";

Blockly.Msg.BLOCK_VELOCITY_FROM_ANGLE = "la vélocité depuis l'angle";
Blockly.Msg.BLOCK_SCALE = "agrandissement";
Blockly.Msg.BLOCK_BOUNCE = "rebond";
Blockly.Msg.BLOCK_FRICTION = "frottement";

Blockly.Msg.BLOCK_COLLIDE_BOUNDE = "entre en collision avec les bords";
Blockly.Msg.BLOCK_IMMOVABLE = "immobiliser";
Blockly.Msg.BLOCK_ROTATE_WHEN_COLLIDE = "tourner quand entre en collision";
Blockly.Msg.BLOCK_DESTROY = "détruire";

Blockly.Msg.BLOCK_IN = "dans";
Blockly.Msg.BLOCK_FROM = "à partir de";
Blockly.Msg.BLOCK_EVERY = "toutes les";

Blockly.Msg.CAMERA_FOLLOW = "la caméra suit";

// tool tips
Blockly.Msg.TOOLTIP_GAME_IMAGE = "selectione une image pour l'acteur dans la catégorie %1.";

Blockly.Msg.TOOLTIP_ACTOR_CREATE = "crée un nouvel acteur dans le jeu.";
Blockly.Msg.TOOLTIP_ACTOR_OBJECT = "obtient l'objet acteur.";
Blockly.Msg.TOOLTIP_ACTOR_GET = "obtient la valeur de la propriété de l'acteur.\nles propriétés sont :\n%1";
Blockly.Msg.TOOLTIP_ACTOR_SET = "définit la valeur de la propriété de l'acteur.\nles propriétés sont :\n%1";
Blockly.Msg.TOOLTIP_ACTOR_ACTION = "exécute une action sur l'objet.\nles méthodes sont :\n%1";
Blockly.Msg.TOOLTIP_ACTOR_EVERY = "exécute une action en fonction du temps.\nles événements sont :\n%1";
Blockly.Msg.TOOLTIP_ACTOR_COLLIDE = "exécute une action quand les acteurs entrent en collision ensemble.";

Blockly.Msg.TOOLTIP_GAME_CREATE = "crée le jeu.";
Blockly.Msg.TOOLTIP_GAME_GET = "obtient la valeure de la propriété du jeu.\nles propriétés sont :\n%1";
Blockly.Msg.TOOLTIP_GAME_DEBUG = "affiche les indications de déboguage du jeu.";
Blockly.Msg.TOOLTIP_GAME_DEBUG_VAR = "affiche les indications de déboguage d'une variable en particulier.";

Blockly.Msg.TOOLTIP_CAMERA_FOLLOW = "la caméra suit l'acteur.";
Blockly.Msg.TOOLTIP_PRINT = "écrit un texte à l'écran.";

Blockly.Msg.ALERT_MAX_ACTOR = "le nombre maximum d'acteur [%1] à été ateint.\nvous ne pouvez plus en créer d'autre.";