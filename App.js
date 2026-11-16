import React, { useMemo, useState } from "react";
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, StatusBar, Linking, Alert, KeyboardAvoidingView, Platform
} from "react-native";

const NAVY = "#101D35";
const NAVY2 = "#172946";
const GOLD = "#D7B56D";
const GOLD_LIGHT = "#F1DCA7";
const BG = "#F5F6F8";
const MUTED = "#69758A";
const LINE = "#E5E8EE";
const WHATSAPP = "919639002254";
const EMAIL = "eduvexa.international@gmail.com";

const DESTINATIONS = ["United Kingdom", "Canada", "Australia", "United States"];
const DOCS = [
  "Passport identity page",
  "Academic marksheets and certificates",
  "English-language test result (if applicable)",
  "CV / résumé",
  "Statement of purpose / personal statement",
  "University offer or admission correspondence",
];

const COURSE_INFO = [
  { country: "United Kingdom", title: "Undergraduate & postgraduate study", detail: "Explore bachelor's and master's programmes across subject areas." },
  { country: "Canada", title: "College and university pathways", detail: "Compare academic pathways and institution requirements." },
  { country: "Australia", title: "Higher education programmes", detail: "Explore degrees and vocational study options." },
  { country: "United States", title: "College and university admissions", detail: "Understand undergraduate and graduate admission pathways." },
];

function Button({ title, onPress, secondary = false, compact = false }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, secondary && styles.buttonSecondary, compact && styles.buttonCompact]}>
      <Text style={[styles.buttonText, secondary && styles.buttonTextSecondary, compact && styles.buttonTextCompact]}>{title}</Text>
    </TouchableOpacity>
  );
}
function Field({ label, value, onChangeText, placeholder, keyboardType, secureTextEntry, multiline }) {
  return <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value} onChangeText={onChangeText} placeholder={placeholder || label}
      placeholderTextColor="#9AA4B3" keyboardType={keyboardType || "default"}
      secureTextEntry={secureTextEntry} multiline={multiline}
      style={[styles.input, multiline && styles.textArea]}
      autoCapitalize={keyboardType === "email-address" ? "none" : "sentences"}
    />
  </View>;
}
function SectionTitle({ eyebrow, title, subtitle }) {
  return <View style={{ marginBottom: 18 }}>
    <Text style={styles.eyebrow}>{eyebrow}</Text>
    <Text style={styles.sectionTitle}>{title}</Text>
    {!!subtitle && <Text style={styles.muted}>{subtitle}</Text>}
  </View>;
}
function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export default function App() {
  const [screen, setScreen] = useState("login");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [checkedDocs, setCheckedDocs] = useState([]);
  const [courseFilter, setCourseFilter] = useState("All");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [appName, setAppName] = useState("");
  const [appPhone, setAppPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [course, setCourse] = useState("");
  const [intake, setIntake] = useState("");
  const [message, setMessage] = useState("");

  const latest = applications[applications.length - 1];
  const filteredCourses = useMemo(
    () => COURSE_INFO.filter(c => courseFilter === "All" || c.country === courseFilter),
    [courseFilter]
  );

  function createAccount() {
    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || regPassword.length < 6) {
      Alert.alert("Check your details", "Complete all fields. Password must be at least 6 characters.");
      return;
    }
    const email = regEmail.trim().toLowerCase();
    if (accounts.some(a => a.email === email)) {
      Alert.alert("Account exists", "Please sign in with this email.");
      return;
    }
    const newUser = { name: regName.trim(), email, phone: regPhone.trim() };
    setAccounts(prev => [...prev, { ...newUser, demoPassword: regPassword }]);
    enter(newUser);
    Alert.alert("Demo account created", "This prototype keeps account data only in app memory. Connect secure authentication before real use.");
  }

  function signIn() {
    const found = accounts.find(a => a.email === loginEmail.trim().toLowerCase() && a.demoPassword === loginPassword);
    if (!found) {
      Alert.alert("Demo sign-in", "No matching demo account. Create an account or use Explore demo.");
      return;
    }
    enter(found);
  }

  function exploreDemo() {
    enter({ name: "Demo Student", email: "demo@student.eduvexa.test", phone: "+91 90000 00000" });
  }

  function enter(person) {
    setUser(person);
    setAppName(person.name);
    setAppPhone(person.phone || "");
    setScreen("dashboard");
  }

  function submitApplication() {
    if (!appName.trim() || !appPhone.trim() || !qualification.trim()) {
      Alert.alert("Required information", "Please enter your name, phone number and highest qualification.");
      return;
    }
    const record = {
      id: Date.now().toString(),
      name: appName.trim(), phone: appPhone.trim(), email: user?.email || "",
      qualification: qualification.trim(), country, course: course.trim(),
      intake: intake.trim(), message: message.trim(),
      status: "Enquiry received", created: new Date().toLocaleDateString(),
    };
    setApplications(prev => [...prev, record]);
    setMessage("");
    setCourse("");
    setIntake("");
    Alert.alert("Enquiry saved", "This is a local prototype. Your enquiry has not been sent to Eduvexa's office.");
    setScreen("dashboard");
  }

  function signOut() {
    setUser(null);
    setScreen("login");
    setAuthMode("login");
  }

  function openWhatsApp() {
    Linking.openURL(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hello Eduvexa International, I would like to enquire about studying abroad.")}`);
  }

  function openEmail() {
    Linking.openURL(`mailto:${EMAIL}?subject=${encodeURIComponent("Eduvexa International enquiry")}`);
  }

  function renderAuth() {
    return <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.authWrap} keyboardShouldPersistTaps="handled">
        <View style={styles.logoRow}>
          <View style={styles.logoMark}><Text style={styles.logoLetter}>E</Text></View>
          <View><Text style={styles.brandName}>EDUVEXA</Text><Text style={styles.brandSub}>INTERNATIONAL</Text></View>
        </View>
        <Text style={styles.eyebrow}>YOUR FUTURE. BEYOND BORDERS.</Text>
        <Text style={styles.authTitle}>{authMode === "login" ? "Student login" : "Create your account"}</Text>
        <Text style={styles.muted}>Access your study-abroad enquiries, application progress and guidance.</Text>
        <Card style={{ marginTop: 22 }}>
          {authMode === "login" ? <>
            <Field label="Email address" value={loginEmail} onChangeText={setLoginEmail} placeholder="you@example.com" keyboardType="email-address" />
            <Field label="Password" value={loginPassword} onChangeText={setLoginPassword} secureTextEntry placeholder="Enter password" />
            <Button title="Sign in" onPress={signIn} />
            <Button title="Create student account" secondary onPress={() => setAuthMode("register")} />
            <Button title="Explore demo app" secondary onPress={exploreDemo} />
          </> : <>
            <Field label="Full name" value={regName} onChangeText={setRegName} />
            <Field label="Email address" value={regEmail} onChangeText={setRegEmail} keyboardType="email-address" />
            <Field label="Mobile number" value={regPhone} onChangeText={setRegPhone} keyboardType="phone-pad" />
            <Field label="Create password" value={regPassword} onChangeText={setRegPassword} secureTextEntry placeholder="At least 6 characters" />
            <Button title="Create account" onPress={createAccount} />
            <Button title="Back to login" secondary onPress={() => setAuthMode("login")} />
          </>}
        </Card>
        <View style={styles.warning}><Text style={styles.warningText}>Prototype only: sign-in and records are temporary in-memory demo data. Do not enter real passwords or sensitive documents. Secure cloud authentication and storage are required before launch.</Text></View>
      </ScrollView>
    </KeyboardAvoidingView>;
  }

  function renderDashboard() {
    return <>
      <SectionTitle eyebrow="STUDENT PORTAL" title={`Welcome, ${(user?.name || "Student").split(" ")[0]}`} subtitle={user?.email} />
      <View style={styles.statsRow}>
        <Card style={styles.stat}><Text style={styles.statLabel}>Applications</Text><Text style={styles.statValue}>{applications.length}</Text></Card>
        <Card style={styles.stat}><Text style={styles.statLabel}>Documents ready</Text><Text style={styles.statValue}>{checkedDocs.length}/{DOCS.length}</Text></Card>
        <Card style={styles.stat}><Text style={styles.statLabel}>Latest status</Text><Text style={[styles.statValue, { fontSize: 14 }]}>{latest?.status || "Not started"}</Text></Card>
      </View>
      <SectionTitle eyebrow="GET STARTED" title="Quick actions" />
      <View style={styles.actionGrid}>
        {[
          ["⌕", "Find a course", "courses"],
          ["✎", "Start application", "application"],
          ["▣", "Document checklist", "documents"],
          ["✈", "Visa guidance", "visa"],
        ].map(([icon, label, target]) => <TouchableOpacity key={target} style={styles.actionCard} onPress={() => setScreen(target)}>
          <Text style={styles.actionIcon}>{icon}</Text><Text style={styles.actionTitle}>{label}</Text><Text style={styles.actionHint}>Open section →</Text>
        </TouchableOpacity>)}
      </View>
      <SectionTitle eyebrow="RECENT ACTIVITY" title="My applications" />
      {applications.length === 0 ? <Card><Text style={styles.muted}>You have no applications yet. Submit an enquiry to begin.</Text></Card> :
        [...applications].reverse().map(a => <Card key={a.id} style={{ marginBottom: 10 }}>
          <Text style={styles.cardTitle}>{a.country} · {a.course || "Course not specified"}</Text>
          <Text style={styles.muted}>{a.created} · {a.intake || "Intake not specified"}</Text>
          <Text style={styles.status}>{a.status}</Text>
        </Card>)}
    </>;
  }

  function renderCourses() {
    return <>
      <SectionTitle eyebrow="EXPLORE YOUR OPTIONS" title="Courses & destinations" subtitle="Illustrative categories. Verify course availability, fees and entry criteria with each institution." />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
        {["All", ...DESTINATIONS].map(x => <TouchableOpacity key={x} onPress={() => setCourseFilter(x)} style={[styles.filter, courseFilter === x && styles.filterActive]}><Text style={[styles.filterText, courseFilter === x && styles.filterTextActive]}>{x}</Text></TouchableOpacity>)}
      </ScrollView>
      {filteredCourses.map(c => <Card key={c.country} style={{ marginBottom: 12 }}>
        <Text style={styles.eyebrow}>{c.country.toUpperCase()}</Text><Text style={styles.cardTitle}>{c.title}</Text><Text style={styles.muted}>{c.detail}</Text>
        <Button title="Enquire about this destination" compact onPress={() => { setCountry(c.country); setScreen("application"); }} />
      </Card>)}
    </>;
  }

  function renderApplication() {
    return <>
      <SectionTitle eyebrow="YOUR NEXT STEP" title="Study application enquiry" subtitle="Share your preferences so an Eduvexa advisor can understand your plans." />
      <Card>
        <Field label="Full name" value={appName} onChangeText={setAppName} />
        <Field label="Phone number" value={appPhone} onChangeText={setAppPhone} keyboardType="phone-pad" />
        <Field label="Highest qualification" value={qualification} onChangeText={setQualification} placeholder="e.g. Bachelor's degree" />
        <Text style={styles.label}>Preferred destination</Text>
        <View style={styles.chipWrap}>{[...DESTINATIONS, "Not decided"].map(x => <TouchableOpacity key={x} onPress={() => setCountry(x)} style={[styles.chip, country === x && styles.chipActive]}><Text style={[styles.chipText, country === x && styles.chipTextActive]}>{x}</Text></TouchableOpacity>)}</View>
        <Field label="Preferred course" value={course} onChangeText={setCourse} placeholder="Course or subject" />
        <Field label="Intake" value={intake} onChangeText={setIntake} placeholder="e.g. September 2027" />
        <Field label="Additional information" value={message} onChangeText={setMessage} multiline placeholder="Tell us about your study plans..." />
        <Button title="Save enquiry (demo)" onPress={submitApplication} />
        <Text style={styles.smallNote}>Demo action only: the enquiry is not sent to Eduvexa until a backend is connected.</Text>
      </Card>
    </>;
  }

  function renderDocuments() {
    return <>
      <SectionTitle eyebrow="GET PREPARED" title="Document checklist" subtitle="Tick items as you prepare them. Exact requirements vary by institution and visa route." />
      {DOCS.map((doc, i) => {
        const done = checkedDocs.includes(i);
        return <TouchableOpacity key={doc} onPress={() => setCheckedDocs(prev => done ? prev.filter(x => x !== i) : [...prev, i])} style={styles.checkRow}>
          <View style={[styles.checkbox, done && styles.checkboxDone]}>{done && <Text style={{ color: NAVY, fontWeight: "900" }}>✓</Text>}</View>
          <Text style={[styles.checkText, done && { color: MUTED, textDecorationLine: "line-through" }]}>{doc}</Text>
        </TouchableOpacity>;
      })}
      <View style={styles.warning}><Text style={styles.warningText}>This is a planning checklist, not a definitive requirement list. Do not upload sensitive documents in this prototype.</Text></View>
    </>;
  }

  function renderVisa() {
    const links = [
      ["United Kingdom", "UK Student visa", "https://www.gov.uk/student-visa"],
      ["Canada", "Study in Canada", "https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html"],
      ["Australia", "Student visa subclass 500", "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500"],
      ["United States", "Student visa information", "https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"],
    ];
    return <>
      <SectionTitle eyebrow="KNOW BEFORE YOU APPLY" title="Visa guidance centre" subtitle="Official government resources for checking current requirements." />
      {links.map(([countryName, title, url]) => <Card key={countryName} style={{ marginBottom: 12 }}>
        <Text style={styles.eyebrow}>{countryName.toUpperCase()}</Text><Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.muted}>Review current eligibility, evidence and application steps directly with the relevant authority.</Text>
        <Button title="Open official guidance ↗" compact secondary onPress={() => Linking.openURL(url)} />
      </Card>)}
      <View style={styles.warning}><Text style={styles.warningText}>Visa decisions are made solely by the relevant government authority. Eduvexa cannot guarantee admission, employment or visa outcomes.</Text></View>
    </>;
  }

  const menu = [
    ["dashboard", "⌂", "Home"],
    ["courses", "▤", "Courses"],
    ["application", "✎", "Apply"],
    ["documents", "▣", "Documents"],
    ["visa", "✈", "Visa help"],
  ];

  return <SafeAreaView style={styles.safe}>
    <StatusBar barStyle="light-content" backgroundColor={NAVY} />
    <View style={styles.header}>
      <View style={styles.logoMark}><Text style={styles.logoLetter}>E</Text></View>
      <View style={{ flex: 1 }}><Text style={styles.brandName}>EDUVEXA</Text><Text style={styles.brandSub}>INTERNATIONAL</Text></View>
      {user && <TouchableOpacity onPress={signOut}><Text style={styles.headerLink}>Sign out</Text></TouchableOpacity>}
    </View>
    {!user ? renderAuth() : <>
      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent} keyboardShouldPersistTaps="handled">
        {screen === "dashboard" && renderDashboard()}
        {screen === "courses" && renderCourses()}
        {screen === "application" && renderApplication()}
        {screen === "documents" && renderDocuments()}
        {screen === "visa" && renderVisa()}
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Need help with your plans?</Text>
          <Text style={styles.contactText}>Eduvexa International · Puranpur, Pilibhit, Uttar Pradesh</Text>
          <Button title="Chat on WhatsApp" compact onPress={openWhatsApp} />
          <TouchableOpacity onPress={openEmail} style={{ padding: 10 }}><Text style={styles.emailLink}>{EMAIL}</Text></TouchableOpacity>
        </View>
        <Text style={styles.footer}>© {new Date().getFullYear()} Eduvexa International · Your Future. Beyond Borders.</Text>
      </ScrollView>
      <View style={styles.tabBar}>
        {menu.map(([id, icon, label]) => <TouchableOpacity key={id} onPress={() => setScreen(id)} style={styles.tab}>
          <Text style={[styles.tabIcon, screen === id && styles.tabSelected]}>{icon}</Text>
          <Text style={[styles.tabLabel, screen === id && styles.tabSelected]}>{label}</Text>
        </TouchableOpacity>)}
      </View>
    </>}
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:BG},header:{backgroundColor:NAVY,paddingHorizontal:18,paddingVertical:13,flexDirection:"row",alignItems:"center",gap:10},
  logoMark:{width:38,height:38,borderWidth:2,borderColor:GOLD,borderRadius:11,alignItems:"center",justifyContent:"center"},
  logoLetter:{color:GOLD,fontSize:22,fontWeight:"800"},brandName:{color:"#fff",fontWeight:"900",letterSpacing:2,fontSize:14},brandSub:{color:"#c6cfdb",fontSize:8,letterSpacing:2.2},
  headerLink:{color:GOLD_LIGHT,fontSize:12,fontWeight:"700"},body:{flex:1},bodyContent:{padding:17,paddingBottom:30},
  authWrap:{flexGrow:1,justifyContent:"center",padding:20,paddingBottom:45},logoRow:{flexDirection:"row",alignItems:"center",gap:12,marginBottom:28},
  eyebrow:{color:"#A17B35",fontSize:10,fontWeight:"900",letterSpacing:1.8,marginBottom:7},authTitle:{fontFamily:Platform.OS==="ios"?"Georgia":"serif",fontSize:34,color:NAVY,marginVertical:8},
  sectionTitle:{fontFamily:Platform.OS==="ios"?"Georgia":"serif",fontSize:29,color:NAVY,marginBottom:6},muted:{color:MUTED,fontSize:13,lineHeight:19},
  card:{background:"#fff",borderWidth:1,borderColor:LINE,borderRadius:13,padding:16,marginBottom:13},
  field:{marginBottom:13},label:{fontSize:12,fontWeight:"800",color:"#435067",marginBottom:6},
  input:{borderWidth:1,borderColor:"#DCE1E8",borderRadius:9,paddingHorizontal:12,paddingVertical:11,color:"#182338",background:"#fff",fontSize:14},
  textArea:{minHeight:90,textAlignVertical:"top"},button:{background:GOLD,borderRadius:9,paddingVertical:13,paddingHorizontal:15,alignItems:"center",marginTop:8},
  buttonSecondary:{background:"#F3F5F8",borderWidth:1,borderColor:LINE},buttonCompact:{alignSelf:"flex-start",paddingVertical:9,paddingHorizontal:12},
  buttonText:{color:"#17243A",fontWeight:"900",fontSize:14},buttonTextSecondary:{color:NAVY},buttonTextCompact:{fontSize:12},
  warning:{background:"#FFF7E5",borderColor:"#F0DFB6",borderWidth:1,borderRadius:10,padding:12,marginTop:16},
  warningText:{color:"#6B5423",fontSize:11,lineHeight:17},statsRow:{flexDirection:"row",gap:8,marginBottom:24},
  stat:{flex:1,padding:12,marginBottom:0},statLabel:{color:MUTED,fontSize:10,fontWeight:"700"},statValue:{color:NAVY,fontSize:23,fontWeight:"900",marginTop:7},
  actionGrid:{flexDirection:"row",flexWrap:"wrap",gap:10,marginBottom:22},actionCard:{background:"#fff",borderWidth:1,borderColor:LINE,borderRadius:12,padding:13,width:"48%",minHeight:112},
  actionIcon:{fontSize:23,color:"#A17B35"},actionTitle:{fontWeight:"850",fontSize:13,color:NAVY,marginTop:8},actionHint:{fontSize:10,color:MUTED,marginTop:4},
  cardTitle:{fontSize:15,fontWeight:"850",color:NAVY,marginVertical:7},status:{color:"#936D2C",fontSize:11,fontWeight:"900",marginTop:8},
  filter:{paddingVertical:8,paddingHorizontal:12,borderRadius:30,borderWidth:1,borderColor:LINE,marginRight:7,background:"#fff"},
  filterActive:{background:NAVY,borderColor:NAVY},filterText:{fontSize:11,color:"#536075"},filterTextActive:{color:GOLD_LIGHT,fontWeight:"800"},
  chipWrap:{flexDirection:"row",flexWrap:"wrap",gap:7,marginVertical:8},chip:{paddingHorizontal:10,paddingVertical:8,borderRadius:20,borderWidth:1,borderColor:LINE},
  chipActive:{background:NAVY,borderColor:NAVY},chipText:{fontSize:11,color:"#536075"},chipTextActive:{color:GOLD_LIGHT,fontWeight:"800"},
  smallNote:{fontSize:10,color:MUTED,marginTop:10,lineHeight:15},checkRow:{background:"#fff",borderColor:LINE,borderWidth:1,borderRadius:10,padding:14,marginBottom:8,flexDirection:"row",alignItems:"center",gap:11},
  checkbox:{width:21,height:21,borderRadius:5,borderWidth:1.5,borderColor:"#B7C0CD",alignItems:"center",justifyContent:"center"},
  checkboxDone:{background:GOLD,borderColor:GOLD},checkText:{fontSize:12,color:NAVY,flex:1},contactCard:{background:NAVY,borderRadius:13,padding:17,marginTop:18,alignItems:"flex-start"},
  contactTitle:{fontSize:18,color:"#fff",fontFamily:Platform.OS==="ios"?"Georgia":"serif"},contactText:{fontSize:11,color:"#c5cfdd",marginVertical:8},
  emailLink:{color:GOLD_LIGHT,fontSize:12},footer:{textAlign:"center",fontSize:10,color:"#8994A5",paddingVertical:20},
  tabBar:{flexDirection:"row",background:"#fff",borderTopWidth:1,borderColor:LINE,paddingTop:8,paddingBottom:Platform.OS==="ios"?17:8,justifyContent:"space-around"},
  tab:{alignItems:"center",flex:1},tabIcon:{fontSize:18,color:"#8792A3"},tabLabel:{fontSize:9,color:"#8792A3",marginTop:2},tabSelected:{color:"#A17B35",fontWeight:"900"},
});
