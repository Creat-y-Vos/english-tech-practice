import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Flame, MessageCircle, BookOpen, Send } from 'lucide-react-native';

const EnglishTechPracticeApp = () => {
  const [activeTab, setActiveTab] = useState('tracker');
  const [streak, setStreak] = useState(0);
  const [lastPracticeDate, setLastPracticeDate] = useState(null);
  const [vocabulary, setVocabulary] = useState([
    { id: '1', topic: 'General Tech', word: 'ROI (Return on Investment)', definition: 'Metric to measure profit' },
    { id: '2', topic: 'Present Results', word: 'quarterly results', definition: 'Performance metrics every 3 months' },
  ]);
  const [selectedTopic, setSelectedTopic] = useState('Present Results');
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newDefinition, setNewDefinition] = useState('');
  const flatListRef = useRef(null);
  const [weekStats, setWeekStats] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  });

  const topics = ['Present Results', 'Introduce Your Team', 'Kick-off Meeting', 'Strategic Decisions'];

  const topicPrompts = {
    'Present Results': 'You are a director/executive asking about quarterly results. Ask detailed questions about metrics, growth, challenges.',
    'Introduce Your Team': 'You are a client meeting the team for the first time. Ask about roles, experience, and team strengths.',
    'Kick-off Meeting': 'You are leading a kick-off for a new project. Ask clarifying questions about objectives, timeline, and expectations.',
    'Strategic Decisions': 'You are a stakeholder challenging a strategic decision. Ask for justification and risk assessment.',
  };

  useEffect(() => {
    const today = new Date().toDateString();
    if (lastPracticeDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastPracticeDate === yesterday) {
        setStreak(streak + 1);
      } else {
        setStreak(1);
      }
      setLastPracticeDate(today);
      const dayIndex = new Date().getDay();
      const dayKeys = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      setWeekStats(prev => ({ ...prev, [dayKeys[dayIndex]]: true }));
    }
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { role: 'user', content: userInput, id: Date.now().toString() };
    setChatHistory(prev => [...prev, newMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const systemPrompt = `You are an English conversation coach specialized in technology business discussions (US English). Your student is a tech executive learning to present to directors and clients.

Current topic: ${selectedTopic}
${topicPrompts[selectedTopic]}

Rules:
1. After each user message, provide feedback in this format:
   - **Correction** (if any grammatical/vocabulary errors - be gentle and constructive)
   - **Better way** (suggest a more natural way to express the same idea)
   - **Continue** (your next question or response to keep the conversation going)

2. Use US English (American pronunciation, vocabulary, idioms)
3. Be conversational and realistic - this is a business meeting
4. Challenge the user professionally but fairly
5. Keep responses concise and focused
6. If the user says something unclear, ask for clarification as a real executive would

Always respond as if you're in an actual business meeting.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          system: systemPrompt,
          messages: chatHistory.map(msg => ({ role: msg.role, content: msg.content })),
        }),
      });

      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.content[0]?.text || 'I encountered an error. Try again.',
        id: (Date.now() + 1).toString(),
      };
      setChatHistory(prev => [...prev, assistantMessage]);
      flatListRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('API Error:', error);
      Alert.alert('Error', 'Connection failed. Check your API setup.');
    }

    setIsLoading(false);
  };

  const addWordToVocab = () => {
    if (newWord.trim()) {
      setVocabulary(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          topic: selectedTopic,
          word: newWord,
          definition: newDefinition,
        },
      ]);
      setNewWord('');
      setNewDefinition('');
    }
  };

  const startNewConversation = () => {
    setChatHistory([
      {
        role: 'assistant',
        content: `Let's practice. I'm going to be a director/executive. ${topicPrompts[selectedTopic]} Ready?`,
        id: '0',
      },
    ]);
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const resetStreak = () => {
    Alert.alert('Reset Streak?', 'Are you sure? This will reset your streak.', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Reset',
        onPress: () => {
          setStreak(0);
          setWeekStats({
            Mon: false,
            Tue: false,
            Wed: false,
            Thu: false,
            Fri: false,
            Sat: false,
            Sun: false,
          });
        },
        style: 'destructive',
      },
    ]);
  };

  // Tracker Tab
  const renderTrackerTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Streak Card */}
      <View style={styles.streakCard}>
        <Text style={styles.streakLabel}>Current Streak</Text>
        <View style={styles.streakContainer}>
          <Flame size={40} color="#f97316" />
          <Text style={styles.streakNumber}>{streak}</Text>
        </View>
        <Text style={styles.streakSubtitle}>Keep it up! Don't break the chain.</Text>
        <TouchableOpacity style={styles.resetButton} onPress={resetStreak}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Week Stats */}
      <View style={styles.weekCard}>
        <Text style={styles.weekTitle}>This Week</Text>
        <View style={styles.weekGrid}>
          {Object.entries(weekStats).map(([day, completed]) => (
            <View
              key={day}
              style={[styles.dayBox, completed && styles.dayBoxCompleted]}
            >
              <Text style={[styles.dayBoxText, completed && styles.dayBoxTextCompleted]}>
                {day[0]}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Info Box */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>How to use this app:</Text>
        <Text style={styles.infoText}>
          • Practice chat conversations daily (5-10 min){'\n'}
          • Chat coach will correct your English naturally{'\n'}
          • Add vocabulary before each topic{'\n'}
          • Show your progress to your professor{'\n'}
          • Target: 4-5 days per week minimum
        </Text>
      </View>
    </ScrollView>
  );

  // Chat Tab
  const renderChatTab = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.chatContainer}
    >
      {/* Topic Selector */}
      <View style={styles.topicSelector}>
        <Text style={styles.topicLabel}>Select Topic</Text>
        <View style={styles.topicGrid}>
          {topics.map(topic => (
            <TouchableOpacity
              key={topic}
              onPress={() => {
                setSelectedTopic(topic);
                setChatHistory([]);
              }}
              style={[
                styles.topicButton,
                selectedTopic === topic && styles.topicButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.topicButtonText,
                  selectedTopic === topic && styles.topicButtonTextActive,
                ]}
              >
                {topic}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Messages */}
      {chatHistory.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No conversation yet</Text>
          <Text style={styles.emptyStateSubtext}>Click "Start" to begin practicing</Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={chatHistory}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageWrapper,
                item.role === 'user' && styles.messageWrapperUser,
              ]}
            >
              <View
                style={[
                  styles.messageBubble,
                  item.role === 'user' && styles.messageBubbleUser,
                ]}
              >
                <Text
                  style={[
                    styles.messageText,
                    item.role === 'user' && styles.messageTextUser,
                  ]}
                >
                  {item.content}
                </Text>
              </View>
            </View>
          )}
          scrollEnabled
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      )}

      {/* Start Button or Input */}
      {chatHistory.length === 0 ? (
        <TouchableOpacity style={styles.startButton} onPress={startNewConversation}>
          <Text style={styles.startButtonText}>Start Conversation</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your response..."
            placeholderTextColor="#6b7280"
            value={userInput}
            onChangeText={setUserInput}
            multiline
            editable={!isLoading}
          />
          <TouchableOpacity
            style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Send size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );

  // Vocabulary Tab
  const renderVocabTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Add Word Form */}
      <View style={styles.addWordCard}>
        <Text style={styles.addWordLabel}>Add New Word</Text>
        <TextInput
          style={styles.wordInput}
          placeholder="Word or phrase..."
          placeholderTextColor="#6b7280"
          value={newWord}
          onChangeText={setNewWord}
        />
        <TextInput
          style={[styles.wordInput, { marginTop: 8 }]}
          placeholder="Definition or usage..."
          placeholderTextColor="#6b7280"
          value={newDefinition}
          onChangeText={setNewDefinition}
        />
        <TouchableOpacity style={styles.addButton} onPress={addWordToVocab}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Vocabulary List */}
      {vocabulary.map(item => (
        <View key={item.id} style={styles.vocabItem}>
          <Text style={styles.vocabWord}>{item.word}</Text>
          <Text style={styles.vocabDefinition}>{item.definition}</Text>
          <Text style={styles.vocabTopic}>{item.topic}</Text>
        </View>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>💬 English Tech Practice</Text>
        <Text style={styles.headerSubtitle}>1-2 months • US English • Business conversations</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {[
          { id: 'tracker', icon: '🔥', label: 'Tracker' },
          { id: 'chat', icon: '💬', label: 'Practice' },
          { id: 'vocab', icon: '📚', label: 'Vocabulary' },
        ].map(tab => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={[styles.tabButton, activeTab === tab.id && styles.tabButtonActive]}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === 'tracker' && renderTrackerTab()}
      {activeTab === 'chat' && renderChatTab()}
      {activeTab === 'vocab' && renderVocabTab()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
  header: {
    backgroundColor: '#111827',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#e5e7eb',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: '#3b82f6',
    backgroundColor: '#1f2937',
  },
  tabIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabLabelActive: {
    fontWeight: '600',
    color: '#3b82f6',
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  streakCard: {
    backgroundColor: '#1f2937',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    alignItems: 'center',
    marginBottom: 16,
  },
  streakLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 8,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#f97316',
    marginLeft: 8,
  },
  streakSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 12,
  },
  resetButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#7f1d1d',
    borderRadius: 6,
  },
  resetButtonText: {
    fontSize: 12,
    color: '#fca5a5',
    fontWeight: '600',
  },
  weekCard: {
    backgroundColor: '#1f2937',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 16,
  },
  weekTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e5e7eb',
    marginBottom: 16,
  },
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayBox: {
    width: '13%',
    aspectRatio: 1,
    backgroundColor: '#374151',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBoxCompleted: {
    backgroundColor: '#3b82f6',
  },
  dayBoxText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  dayBoxTextCompleted: {
    color: '#fff',
  },
  infoBox: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#d1d5db',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#d1d5db',
    lineHeight: 20,
  },
  topicSelector: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 16,
  },
  topicLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 8,
  },
  topicGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  topicButton: {
    flex: 1,
    minWidth: '48%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#374151',
    borderRadius: 6,
  },
  topicButtonActive: {
    backgroundColor: '#3b82f6',
  },
  topicButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  topicButtonTextActive: {
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6b7280',
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
  },
  messageWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 6,
  },
  messageWrapperUser: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    backgroundColor: '#1f2937',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    maxWidth: '85%',
  },
  messageBubbleUser: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  messageText: {
    fontSize: 13,
    color: '#d1d5db',
    lineHeight: 18,
  },
  messageTextUser: {
    color: '#fff',
  },
  startButton: {
    paddingVertical: 12,
    backgroundColor: '#10b981',
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 12,
  },
  startButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 12,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 6,
    color: '#fff',
    fontSize: 13,
    maxHeight: 100,
  },
  sendButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#6b7280',
  },
  addWordCard: {
    backgroundColor: '#1f2937',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 16,
  },
  addWordLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 8,
  },
  wordInput: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 6,
    color: '#fff',
    fontSize: 13,
  },
  addButton: {
    paddingVertical: 10,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  vocabItem: {
    backgroundColor: '#1f2937',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
    marginBottom: 8,
  },
  vocabWord: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3b82f6',
  },
  vocabDefinition: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  vocabTopic: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 4,
  },
});

export default EnglishTechPracticeApp;
