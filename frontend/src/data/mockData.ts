import {
  StudentProfile,
  LearningTask,
  SkillItem,
  Course,
  LearningPathway,
  AssessmentQuestion,
  ChatMessage,
  NotificationItem,
  AchievementBadge,
} from '../types';

export const initialStudent: StudentProfile = {
  name: 'Alex Morgan',
  title: 'AI Systems Apprentice & Software Engineer',
  email: 'alex.morgan@stanford.edu',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  track: 'Agentic AI Systems Architect',
  currentStreak: 14,
  longestStreak: 28,
  streakFrozen: false,
  totalHours: 48.5,
  completedCourses: 3,
  skillsMastered: 16,
  pathwayCompletion: 68,
  level: 4,
  xpPoints: 3450,
  xpToNextLevel: 5000,
  dailyGoalMinutes: 45,
  weeklyGoalHours: 12,
  preferredLearningStyle: 'Hands-on Labs & Architecture Code',
  careerGoal: 'Principal AI Agent Architect & Staff Engineer',
};

export const initialTasks: LearningTask[] = [
  {
    id: 'task-1',
    title: 'Complete LangGraph StateGraph Checkpoint Lab',
    course: 'Agentic Reasoning with LangGraph',
    dueDate: 'Today, 8:00 PM',
    durationMinutes: 40,
    completed: false,
    priority: 'high',
    category: 'coding',
  },
  {
    id: 'task-2',
    title: 'Read IBM Granite 3.0 Architecture Whitepaper',
    course: 'Enterprise LLM Specialization',
    dueDate: 'Tomorrow, 11:30 AM',
    durationMinutes: 25,
    completed: false,
    priority: 'medium',
    category: 'reading',
  },
  {
    id: 'task-3',
    title: 'Multi-Agent Tool Calling Benchmark Quiz',
    course: 'Autonomous Systems & Orchestration',
    dueDate: 'Nov 24, 6:00 PM',
    durationMinutes: 20,
    completed: true,
    priority: 'high',
    category: 'quiz',
  },
  {
    id: 'task-4',
    title: 'Design Hybrid RAG Schema in PostgreSQL & pgvector',
    course: 'High-Performance Vector Databases',
    dueDate: 'Nov 26, 5:00 PM',
    durationMinutes: 60,
    completed: false,
    priority: 'medium',
    category: 'project',
  },
];

export const skillsList: SkillItem[] = [
  {
    id: 'skill-1',
    name: 'Multi-Agent Orchestration (LangGraph / Autogen)',
    category: 'Agentic AI',
    level: 'Advanced',
    percentage: 86,
    modulesCount: 14,
    recentGain: 12,
  },
  {
    id: 'skill-2',
    name: 'LLM Function Calling & Structured Tool Schemas',
    category: 'Prompt Engineering',
    level: 'Advanced',
    percentage: 92,
    modulesCount: 18,
    recentGain: 8,
  },
  {
    id: 'skill-3',
    name: 'Hybrid Vector Search & RAG Optimization',
    category: 'Data & Search',
    level: 'Proficient',
    percentage: 78,
    modulesCount: 11,
    recentGain: 15,
  },
  {
    id: 'skill-4',
    name: 'Async Python & Streaming FastAPI Endpoints',
    category: 'Backend Architecture',
    level: 'Expert',
    percentage: 95,
    modulesCount: 22,
    recentGain: 4,
  },
  {
    id: 'skill-5',
    name: 'Agent Evaluation, Tracing & Guardrails',
    category: 'Reliability',
    level: 'Intermediate',
    percentage: 64,
    modulesCount: 9,
    recentGain: 20,
  },
];

export const weeklyActivityData = [
  { day: 'Mon', hours: 2.5, completedModules: 2 },
  { day: 'Tue', hours: 3.8, completedModules: 4 },
  { day: 'Wed', hours: 4.2, completedModules: 3 },
  { day: 'Thu', hours: 1.5, completedModules: 1 },
  { day: 'Fri', hours: 3.5, completedModules: 3 },
  { day: 'Sat', hours: 5.0, completedModules: 5 },
  { day: 'Sun', hours: 2.2, completedModules: 2 },
];

export const coursesCatalog: Course[] = [
  {
    id: 'course-1',
    title: 'Agentic Reasoning with LangGraph & Multi-Agent Loops',
    description: 'Master cyclical agent graphs, human-in-the-loop workflows, dynamic routing, and memory persistence in production.',
    category: 'Agentic AI',
    instructor: {
      name: 'Dr. Elena Rostova',
      role: 'Principal AI Scientist, DeepLab',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    },
    level: 'Intermediate',
    durationHours: 8.5,
    modulesCount: 14,
    rating: 4.95,
    reviewCount: 1420,
    enrolledStudents: 6850,
    progressPercentage: 72,
    isEnrolled: true,
    isFeatured: true,
    tags: ['LangGraph', 'Python', 'StateGraphs', 'Tool Calling'],
    gradient: 'from-blue-600 to-indigo-700',
    syllabus: [
      { week: 1, title: 'ReAct Loop vs State Machine Graphs', topics: ['Linear Chains limitation', 'StateGraph Primitives', 'Nodes and Edges'] },
      { week: 2, title: 'State Persistence & Checkpointers', topics: ['Postgres Checkpointer', 'Resuming Conversations', 'Thread ID Isolation'] },
      { week: 3, title: 'Human-in-the-Loop Approval Patterns', topics: ['Interrupt Functions', 'State Modification', 'Safe Tool Execution'] },
      { week: 4, title: 'Multi-Agent Hierarchical Teams', topics: ['Supervisor Agent', 'Worker Hand-offs', 'Consensus Mechanisms'] },
    ],
  },
  {
    id: 'course-2',
    title: 'Enterprise RAG Architectures: Hybrid Search & Reranking',
    description: 'Learn modern retrieval augmented generation using sparse and dense embeddings, reciprocal rank fusion, and late chunking.',
    category: 'Machine Learning',
    instructor: {
      name: 'Marcus Chen',
      role: 'Staff ML Infrastructure Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    },
    level: 'Advanced',
    durationHours: 6.0,
    modulesCount: 10,
    rating: 4.88,
    reviewCount: 930,
    enrolledStudents: 4120,
    progressPercentage: 45,
    isEnrolled: true,
    isFeatured: false,
    tags: ['Vector DB', 'pgvector', 'RAG', 'Embeddings'],
    gradient: 'from-indigo-600 to-violet-700',
    syllabus: [
      { week: 1, title: 'Chunking Strategies & Context Loss', topics: ['Semantic Chunking', 'Sliding Window', 'Parent-Child Documents'] },
      { week: 2, title: 'Sparse BM25 + Dense Hybrid Fusion', topics: ['Reciprocal Rank Fusion', 'Cross-Encoder Reranking', 'ColBERT'] },
      { week: 3, title: 'Evaluation with RAGAS Metrics', topics: ['Faithfulness', 'Answer Relevance', 'Context Recall'] },
    ],
  },
  {
    id: 'course-3',
    title: 'IBM Granite 3.0: Enterprise Foundations & Alignment',
    description: 'Deep dive into IBM open-source Granite models, Instruct tuning, function calling accuracy, and enterprise deployment.',
    category: 'Agentic AI',
    instructor: {
      name: 'Sarah Jenkins',
      role: 'IBM Research Fellow',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    },
    level: 'Intermediate',
    durationHours: 5.5,
    modulesCount: 8,
    rating: 4.92,
    reviewCount: 640,
    enrolledStudents: 3290,
    progressPercentage: 20,
    isEnrolled: true,
    isFeatured: true,
    tags: ['IBM Granite', 'Enterprise AI', 'Fine-Tuning', 'Ollama'],
    gradient: 'from-violet-600 to-purple-800',
    syllabus: [
      { week: 1, title: 'Granite 3.0 8B & 2B Architecture', topics: ['MoE vs Dense', 'Safety Guardrails', 'Benchmark Comparison'] },
      { week: 2, title: 'Tool Calling & JSON Strict Mode', topics: ['Function Definition Format', 'Grammar Enforced Decoding', 'Error Recovery'] },
      { week: 3, title: 'Deployment via vLLM and FastAPI', topics: ['Quantization (AWQ/GPTQ)', 'Docker Containerization', 'Latency SLA'] },
    ],
  },
  {
    id: 'course-4',
    title: 'High-Concurrency FastAPI & Asynchronous AI Microservices',
    description: 'Design non-blocking streaming APIs with SSE, WebSockets, background task workers, and Celery for intensive model workflows.',
    category: 'Backend Architecture' as any,
    instructor: {
      name: 'David Thorne',
      role: 'Cloud Architect & Core Python Contributor',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
    },
    level: 'Advanced',
    durationHours: 7.0,
    modulesCount: 12,
    rating: 4.97,
    reviewCount: 1850,
    enrolledStudents: 9100,
    progressPercentage: 100,
    isEnrolled: true,
    isFeatured: false,
    tags: ['FastAPI', 'AsyncIO', 'WebSockets', 'SSE'],
    gradient: 'from-cyan-600 to-blue-700',
    syllabus: [
      { week: 1, title: 'Async Event Loops in High-Throughput I/O', topics: ['uvloop tuning', 'Async context managers', 'Threadpools'] },
      { week: 2, title: 'Server-Sent Events for Token Streaming', topics: ['StreamingResponse', 'Backpressure Handling', 'Reconnection'] },
    ],
  },
  {
    id: 'course-5',
    title: 'Autonomous Multi-Agent Systems & Swarm Intelligence',
    description: 'Orchestrate teams of specialized agents with shared memory, dynamic delegation, peer review, and self-correcting loops.',
    category: 'Agentic AI',
    instructor: {
      name: 'Prof. Amara Okafor',
      role: 'Director of AI Systems Institute',
      avatar: 'https://images.unsplash.com/photo-1534751516642-a171ed2820d9?auto=format&fit=crop&w=256&q=80',
    },
    level: 'Advanced',
    durationHours: 10.0,
    modulesCount: 16,
    rating: 4.96,
    reviewCount: 810,
    enrolledStudents: 3840,
    isEnrolled: false,
    isFeatured: true,
    tags: ['Swarm', 'Consensus', 'Multi-Agent', 'Self-Healing'],
    gradient: 'from-emerald-600 to-teal-700',
    syllabus: [
      { week: 1, title: 'Agent Roster & Role Specialization', topics: ['Coordinator vs Worker', 'Prompt Ensembling', 'Context Splitting'] },
      { week: 2, title: 'Shared Blackboards & Message Passing', topics: ['Event Buses', 'Broadcast vs Direct', 'Conflict Resolution'] },
      { week: 3, title: 'Self-Correction & Automated Code Review', topics: ['Test-driven Agent Loops', 'Sandboxed Verification'] },
    ],
  },
  {
    id: 'course-6',
    title: 'Vector Databases in Practice: Qdrant, Pinecone & pgvector',
    description: 'Index millions of vectors with HNSW, quantization, filtered vector queries, and zero-downtime shard rebalancing.',
    category: 'System Design',
    instructor: {
      name: 'Vikram Joshi',
      role: 'Database Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80',
    },
    level: 'Intermediate',
    durationHours: 5.0,
    modulesCount: 8,
    rating: 4.84,
    reviewCount: 420,
    enrolledStudents: 2750,
    isEnrolled: false,
    tags: ['HNSW', 'Quantization', 'Qdrant', 'Databases'],
    gradient: 'from-amber-600 to-orange-700',
    syllabus: [
      { week: 1, title: 'Vector Index Algorithms (IVF vs HNSW)', topics: ['Cosine vs Dot Product', 'Recall vs Latency trade-offs'] },
      { week: 2, title: 'Scalar & Product Quantization', topics: ['Memory Reduction', 'Fast Similarity Search', 'Metadata Filtering'] },
    ],
  },
];

export const mainPathway: LearningPathway = {
  id: 'pathway-agentic-architect',
  title: 'Agentic AI Systems Architect Pathway',
  subtitle: 'Personalized Career Track: From Foundations to Enterprise Multi-Agent Systems',
  description: 'An AI-adapted mastery curriculum crafted for Alex Morgan based on diagnostic skill gaps, focusing on real-world autonomous agents, robust tool execution, and production resilience.',
  totalStages: 4,
  totalModules: 32,
  completedModules: 22,
  estimatedTotalHours: 52,
  stages: [
    {
      id: 'stage-1',
      stageNumber: 1,
      title: 'Foundations of Agentic Systems & Structured Outputs',
      subtitle: 'Master deterministic tool schemas, Pydantic function calling, and token economics.',
      status: 'completed',
      completionPercentage: 100,
      estimatedWeeks: 2,
      modules: [
        { id: 'm-1-1', title: 'LLM Mechanics & Context Window Boundaries', duration: '45 mins', type: 'video', completed: true, description: 'Core LLM attention architecture, tokenizers, and prompt window constraints.' },
        { id: 'm-1-2', title: 'Deterministic JSON Extraction with Pydantic v2', duration: '1 hr 15 mins', type: 'lab', completed: true, description: 'Building rigorous schemas and type-validated outputs from generative models.' },
        { id: 'm-1-3', title: 'OpenAI & Anthropic Function Calling Protocols', duration: '1 hr', type: 'lab', completed: true, description: 'Writing executable tools with docstrings and automatic argument parsing.' },
        { id: 'm-1-4', title: 'Stage 1 Comprehensive Skills Check', duration: '30 mins', type: 'quiz', completed: true, description: 'Evaluate schema design and prompt engineering under strict validation.' },
      ],
    },
    {
      id: 'stage-2',
      stageNumber: 2,
      title: 'Memory Systems, RAG & Vector Knowledge Retrieval',
      subtitle: 'Build persistent agent memory, short/long-term stores, and hybrid knowledge search.',
      status: 'completed',
      completionPercentage: 100,
      estimatedWeeks: 3,
      modules: [
        { id: 'm-2-1', title: 'Short-term Session Memory vs Long-term Vector Memory', duration: '1 hr', type: 'video', completed: true, description: 'Session conversation buffers, semantic summary truncation, and memory architectures.' },
        { id: 'm-2-2', title: 'Hybrid Dense + Sparse Vector Search in pgvector', duration: '2 hrs', type: 'lab', completed: true, description: 'Implementing BM25 and vector distance fusion directly in PostgreSQL.' },
        { id: 'm-2-3', title: 'Chunking Strategies & Contextual Compression', duration: '1 hr 30 mins', type: 'lab', completed: true, description: 'Preventing retrieval hallucination with document reranking.' },
        { id: 'm-2-4', title: 'Memory Integration Project: Personalized Student Brain', duration: '2 hrs 30 mins', type: 'project', completed: true, description: 'Hands-on project connecting external user facts to ongoing agent sessions.' },
      ],
    },
    {
      id: 'stage-3',
      stageNumber: 3,
      title: 'Autonomous Multi-Agent Orchestration with LangGraph',
      subtitle: 'Implement cyclical state machines, human approval pauses, and agent coordination.',
      status: 'in_progress',
      completionPercentage: 65,
      estimatedWeeks: 4,
      modules: [
        { id: 'm-3-1', title: 'StateGraph Architecture: Nodes, Edges & Reducers', duration: '1 hr 15 mins', type: 'lab', completed: true, description: 'Building cyclical computation graphs that outgrow linear DAGs.' },
        { id: 'm-3-2', title: 'Human-in-the-Loop Interventions & Checkpoints', duration: '1 hr 45 mins', type: 'lab', completed: true, inProgress: false, description: 'Adding interrupt points for sensitive agent actions (money, file edits).' },
        { id: 'm-3-3', title: 'Hierarchical Multi-Agent Teams & Supervisor Routing', duration: '2 hrs', type: 'lab', completed: false, inProgress: true, description: 'Building specialized worker agents governed by a centralized planner.' },
        { id: 'm-3-4', title: 'Tool Calling Resilience & Automatic Self-Correction', duration: '1 hr 30 mins', type: 'lab', completed: false, locked: false, description: 'Catching syntax and runtime exceptions to let the agent auto-repair parameters.' },
        { id: 'm-3-5', title: 'Stage 3 Practical Assessment: Build a Research Team', duration: '45 mins', type: 'quiz', completed: false, locked: false, description: 'Build and verify an automated researcher and reviewer dual-agent system.' },
      ],
    },
    {
      id: 'stage-4',
      stageNumber: 4,
      title: 'Enterprise Alignment, IBM Granite & Production Deployment',
      subtitle: 'Fine-tuning open models, safety guardrails, low-latency serving, and capstone deployment.',
      status: 'locked',
      completionPercentage: 0,
      estimatedWeeks: 3,
      modules: [
        { id: 'm-4-1', title: 'IBM Granite 3.0 Architecture & Open Weights Deployment', duration: '1 hr 30 mins', type: 'video', completed: false, locked: true, description: 'Exploring IBM Granite parameter efficiencies, safety tuning, and local hosting.' },
        { id: 'm-4-2', title: 'Deterministic Guardrails with NeMo & Llama-Guard', duration: '1 hr 45 mins', type: 'lab', completed: false, locked: true, description: 'Enforcing input and output constraints on live LLM traffic.' },
        { id: 'm-4-3', title: 'Production Observability & Tracing with OpenInference', duration: '1 hr 15 mins', type: 'lab', completed: false, locked: true, description: 'Tracing latency, token costs, and reasoning step tree inspections.' },
        { id: 'm-4-4', title: 'Capstone: End-to-End Autonomous Educational Assistant', duration: '4 hrs', type: 'project', completed: false, locked: true, description: 'The final capstone integrating FastAPI, Granite LLM, and real-time React dashboard.' },
      ],
    },
  ],
};

export const sampleAssessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q-1',
    question: 'In cyclical agent architectures (e.g., LangGraph), why is a StateGraph preferred over a traditional Directed Acyclic Graph (DAG)?',
    skill: 'Agentic Reasoning',
    difficulty: 'Medium',
    options: [
      'A StateGraph executes faster by omitting type validation.',
      'A StateGraph supports loops, retries, and conditional self-correction edges based on runtime output.',
      'A DAG cannot utilize Python async functions.',
      'A StateGraph automatically optimizes token consumption by 50%.',
    ],
    correctAnswer: 1,
    explanation: 'Cyclical state graphs allow agents to loop back, reflect on execution failures or tool errors, and self-correct their reasoning, which DAGs cannot inherently represent without unrolling.',
  },
  {
    id: 'q-2',
    question: 'Consider this LangGraph state reducer definition. What is the behavior of the `messages` key?',
    skill: 'State Management',
    difficulty: 'Hard',
    codeSnippet: `from typing import Annotated, TypedDict
from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    current_step: int`,
    options: [
      'Every node overwrites the messages list with its latest output.',
      'New messages are appended to the existing conversation history using the `add_messages` reducer.',
      'The messages list is cleared every time `current_step` increments.',
      'It raises a TypeError unless messages is declared as a tuple.',
    ],
    correctAnswer: 1,
    explanation: '`Annotated[list, add_messages]` uses LangGraph\'s built-in message reducer to append new incoming messages to the state while preserving UUID deduplication.',
  },
  {
    id: 'q-3',
    question: 'When implementing Human-in-the-Loop (HITL) in an autonomous agent workflow, what primitive safely pauses execution before a critical tool call?',
    skill: 'Safety & Governance',
    difficulty: 'Medium',
    options: [
      'time.sleep() inside the tool definition',
      'Interrupting execution at a checkpoint and waiting for external state update / approval',
      'Hardcoding a prompt asking the user "Are you sure?" inside the LLM prompt',
      'Terminating the backend process and restarting it with a new session ID',
    ],
    correctAnswer: 1,
    explanation: 'Checkpointers persist the exact thread state and pause execution right before node execution via an interrupt, allowing human inspection, state editing, and resumed continuation.',
  },
  {
    id: 'q-4',
    question: 'In Hybrid Search for RAG systems, why combine Dense Semantic Embeddings with Sparse BM25 Keyword Search?',
    skill: 'Vector Retrieval',
    difficulty: 'Easy',
    options: [
      'To reduce database storage by 70%.',
      'Dense embeddings excel at conceptual meaning, while BM25 guarantees precision for exact product IDs, acronyms, and rare proper nouns.',
      'BM25 is only used when the GPU is unavailable.',
      'To completely avoid generating vector embeddings.',
    ],
    correctAnswer: 1,
    explanation: 'Semantic vectors can miss exact acronyms or specific product codes (out-of-vocabulary), whereas BM25 ensures lexical exact matching. Combining both via Reciprocal Rank Fusion gives superior recall.',
  },
  {
    id: 'q-5',
    question: 'What is the primary benefit of using IBM Granite 3.0 8B Instruct model for enterprise agent tool calling?',
    skill: 'Enterprise LLMs',
    difficulty: 'Medium',
    options: [
      'It operates without any API keys or network connection only.',
      'High instruction-following accuracy and tight alignment on structured JSON tool calling benchmarks with low resource footprint.',
      'It does not require any tokenization.',
      'It can only run on quantum computers.',
    ],
    correctAnswer: 1,
    explanation: 'IBM Granite 3.0 models are specifically aligned and fine-tuned for high enterprise function-calling precision, structured outputs, and compliance with open permissive weights.',
  },
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'assistant',
    timestamp: '10:00 AM',
    text: "Hello Alex! 👋 I'm **LearnMate AI Mentor**, your personal agentic study coach. I've been tracking your progress through the **Agentic AI Systems Architect Pathway**.\n\nYou're currently at **68% completion** on Stage 3. Today, we should tackle **Dynamic Multi-Agent Hand-offs** in LangGraph. How can I help you accelerate your learning right now?",
    actions: ['Explain Multi-Agent Hand-offs', 'Quiz me on Checkpointers', 'Generate a 2-Hour Study Plan'],
  },
  {
    id: 'msg-2',
    sender: 'user',
    timestamp: '10:02 AM',
    text: 'Can you show me a clear code example of how a Supervisor Agent hands off tasks to specialized worker agents in Python?',
  },
  {
    id: 'msg-3',
    sender: 'assistant',
    timestamp: '10:03 AM',
    text: "Here is a clean pattern for a **Supervisor Agent** routing between a `Researcher` and a `Coder` using structured tool routing:",
    codeSnippet: `from typing import Literal
from pydantic import BaseModel, Field

class RouteDecision(BaseModel):
    """Routing schema for the supervisor agent."""
    next_worker: Literal["researcher", "coder", "FINISH"] = Field(
        description="The next specialized agent to execute, or FINISH if the goal is met."
    )
    instruction: str = Field(
        description="Specific instructions or context to delegate to that worker."
    )

# The supervisor node inspects the global conversation state
def supervisor_node(state):
    response = model.with_structured_output(RouteDecision).invoke(
        f"Analyze team progress and delegate next step: {state['messages']}"
    )
    return {"next": response.next_worker, "delegation_notes": response.instruction}`,
    actions: ['How do I pass state between workers?', 'Add this to my Study Notes', 'Test my understanding'],
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🔥 14-Day Streak Unlocked!',
    message: 'Awesome consistency, Alex! You have studied 14 consecutive days. +150 XP awarded.',
    timestamp: '10 minutes ago',
    read: false,
    type: 'streak',
  },
  {
    id: 'notif-2',
    title: '🎯 New Milestone Available in Stage 3',
    message: 'Multi-Agent Tool Calling Lab is now ready for your review.',
    timestamp: '2 hours ago',
    read: false,
    type: 'assignment',
  },
  {
    id: 'notif-3',
    title: '💡 AI Mentor Recommendation',
    message: 'Based on your recent quiz score, reviewing "pgvector Hybrid Search" will boost your overall mastery by 8%.',
    timestamp: 'Yesterday',
    read: true,
    type: 'recommendation',
  },
  {
    id: 'notif-4',
    title: '🏆 Badge Earned: LangGraph Explorer',
    message: 'You completed your first 5 state graph nodes with zero compile errors.',
    timestamp: '2 days ago',
    read: true,
    type: 'achievement',
  },
];

export const badgesList: AchievementBadge[] = [
  {
    id: 'badge-1',
    title: '14-Day Streak Master',
    description: 'Maintained a daily learning habit for two consecutive weeks.',
    icon: 'Flame',
    unlockedAt: 'Nov 21, 2026',
    category: 'streak',
  },
  {
    id: 'badge-2',
    title: 'Agentic Architect',
    description: 'Constructed an end-to-end cyclical multi-agent graph.',
    icon: 'Cpu',
    unlockedAt: 'Nov 18, 2026',
    category: 'mastery',
  },
  {
    id: 'badge-3',
    title: 'Clean Schema Pioneer',
    description: 'Achieved 100% on Pydantic v2 structured output diagnostic.',
    icon: 'ShieldCheck',
    unlockedAt: 'Nov 12, 2026',
    category: 'speed',
  },
  {
    id: 'badge-4',
    title: 'Deep Diver RAG',
    description: 'Integrated sparse and dense reciprocal rank fusion.',
    icon: 'Database',
    unlockedAt: 'Nov 05, 2026',
    category: 'mastery',
  },
  {
    id: 'badge-5',
    title: 'Granite LLM Specialist',
    description: 'Deploy IBM Granite model with function calling protocol.',
    icon: 'Sparkles',
    unlockedAt: null, // Locked
    category: 'mastery',
  },
  {
    id: 'badge-6',
    title: '30-Day Marathoner',
    description: 'Study 30 consecutive days without using a streak freeze.',
    icon: 'Trophy',
    unlockedAt: null, // Locked
    category: 'streak',
  },
];
