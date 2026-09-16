export type VisualizerType = 
  | 'osi-stack' 
  | 'packet-flow' 
  | 'cam-table' 
  | 'tcp-handshake' 
  | 'bit-flipper' 
  | 'cable-wiring' 
  | 'none';

export interface LessonReference {
  titleFa: string;
  source: string; // e.g. 'RFC 791' or 'Cisco Networking'
  url: string;
}

export interface MicroChallengeItem {
  id: string;
  labelFa: string;
  targetGroup: string;
}

export interface MicroChallengeGroup {
  id: string;
  nameFa: string;
}

export interface MicroChallenge {
  id: string;
  titleFa: string;
  type: 'matching' | 'sorter' | 'identifier';
  promptFa: string;
  itemsFa: MicroChallengeItem[];
  groupsFa: MicroChallengeGroup[];
  explanationFa: string;
}

export interface IncidentScenario {
  ticketId: string;
  titleFa: string;
  backgroundFa: string;
  cliSnippet: string;
  diagnosisStepsFa: string[];
  takeawayFa: string;
}

export interface Lesson {
  id: string;
  order: number;
  titleFa: string;
  titleEn: string;
  contentMarkdownFa: string;
  keyTakeawaysFa: string[];
  visualizerType?: VisualizerType;
  references?: LessonReference[];
  microChallenge?: MicroChallenge;
  incidentScenario?: IncidentScenario;
}

export type QuestionType = 'single-choice' | 'terminal-command' | 'matching' | 'flag-inspector';

export interface MatchingPair {
  leftFa: string;
  rightFa: string;
}

export interface PacketFlagItem {
  name: string;
  isSet: boolean;
}

export interface QuizQuestion {
  id: string;
  type?: QuestionType;
  questionFa: string;
  optionsFa: string[];
  correctIndex: number;
  explanationFa: string;
  category?: 'theory' | 'calculation' | 'troubleshooting';
  matchingPairs?: MatchingPair[];
  terminalPrompt?: string;
  expectedCommand?: string;
  acceptedCommands?: string[];
  packetFlags?: PacketFlagItem[];
  missingFlag?: string;
}

export interface ModuleQuiz {
  id: string;
  passingThreshold: number; // e.g. 70
  questions: QuizQuestion[];
}

export interface TroubleshootingLab {
  id: string;
  moduleId: string;
  titleFa: string;
  scenarioBriefFa: string;
  hintsFa: string[];
  initialNodes?: unknown[];
  verificationCommand?: string;
  successMessageFa?: string;
}

export interface CourseModule {
  id: string; // e.g. 'module-1'
  order: number; // 1 to 8
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  estimatedMinutes: number;
  icon: string;
  lessons: Lesson[];
  labs?: TroubleshootingLab[];
  quiz: ModuleQuiz;
}
