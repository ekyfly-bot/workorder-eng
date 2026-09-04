# Work Order Engineering - System Flowcharts

## 1. Work Order Creation & Completion Flow

```mermaid
graph TD
    A["User: Staff/Supervisor"] -->|Buka Aplikasi| B["Dashboard"]
    B -->|Klik Create Work Order| C["Work Order Form"]
    C -->|Fill Details:<br/>Title, Description,<br/>Location, Priority| D["Validation"]
    D -->|Valid?| E{Data OK?}
    E -->|No| F["Show Error Message"]
    F -->|Correct| C
    E -->|Yes| G["Save Work Order"]
    G -->|Create DB Record| H["Status: PENDING"]
    H -->|Send Notification| I["Notify Admin/Supervisor"]
    I -->|List Updated| J["Work Order List"]
    
    J -->|Staff View WO| K["Work Order Detail"]
    K -->|Klik Accept/Start| L["Update Status<br/>to IN_PROGRESS"]
    L -->|Mobile/Web:<br/>Add Photos| M["Capture Evidence"]
    M -->|Add Comments| N["Update Progress"]
    N -->|Complete Work| O["Mark Complete"]
    O -->|Status: COMPLETED| P["Add Completion Date"]
    
    P -->|Submit for QA| Q["QA Review"]
    Q -->|Supervisor/Manager Review| R{Approval?}
    R -->|Reject| S["Return to Staff"]
    S -->|Feedback| C
    R -->|Approve| T["Status: CLOSED"]
    T -->|Send Confirmation| U["Notify All"]
    U -->|Update History| V["Maintenance Log"]
    V -->|End| W["Work Order Closed ✓"]
```

---

## 2. Assignment & Scheduling Flow

```mermaid
graph TD
    A["Work Order Created<br/>Status: PENDING"] -->|System Check| B["Analyze Requirements"]
    B -->|Extract:<br/>- Skill needed<br/>- Priority<br/>- Location| C["Search Available Staff"]
    
    C -->|Query Database| D["Filter by:<br/>- Skills<br/>- Availability<br/>- Department"]
    D -->|Find Candidates| E{Candidates<br/>Found?}
    
    E -->|No| F["Create Backlog"]
    F -->|Wait for Staff| G["Notify Admin"]
    
    E -->|Yes| H["Auto-Assign Option"]
    H -->|Recommend Top Match| I["Assign Automatically"]
    I -->|Alternative: Manual| J["Supervisor Manual Assign"]
    
    J -->|Drag-Drop in Calendar| K["Select Staff"]
    K -->|Set Schedule| L["Choose Date/Time"]
    L -->|Confirm| M["Create Assignment"]
    
    M -->|Update Database| N["Status: ASSIGNED"]
    N -->|Send Push Notification| O["Notify Assigned Staff"]
    O -->|Mobile Notification| P["Staff Receives Alert"]
    P -->|Accept/Decline| Q{Response?}
    
    Q -->|Decline| R["Reassign to Others"]
    R -->|Back to Assignment| J
    
    Q -->|Accept| S["Status: ACCEPTED"]
    S -->|Add to Staff Schedule| T["Confirm Attendance"]
    T -->|Ready for Work| U["Assignment Complete"]
```

---

## 3. Real-time Update & Notification Flow

```mermaid
graph TD
    A["Event Triggered:<br/>- WO Created<br/>- Status Updated<br/>- New Comment"] -->|Capture Event| B["Event Handler"]
    B -->|Determine Recipients| C["Identify Stakeholders"]
    C -->|Check Permissions| D["Filter by Role/Access"]
    
    D -->|Get User Preferences| E["Check Notification Settings"]
    E -->|Prepare Payload| F["Build Notification Object"]
    F -->|Split Channels| G["Route to Channels"]
    
    G -->|Mobile Users| H["Firebase Cloud Messaging"]
    H -->|Send Push| I["Mobile Notification"]
    I -->|Background/Foreground| J["Update Mobile App"]
    
    G -->|Web Users| K["WebSocket Connection"]
    K -->|Real-time Update| L["Browser Notification + UI Update"]
    
    G -->|Store Record| M["Database: Notifications Table"]
    M -->|Track Read Status| N["Mark as Read"]
    
    J -->|User Taps| O["Open Work Order"]
    L -->|User Clicks| O
    O -->|Fetch Latest Data| P["API Call"]
    P -->|Return WO Details| Q["Display in App"]
    Q -->|Completed| R["Notification Served ✓"]
```

---

## 4. Mobile App Offline Sync Flow

```mermaid
graph TD
    A["Mobile App Started"] -->|Check Connection| B{Online?}
    
    B -->|Yes| C["Sync Mode: ONLINE"]
    C -->|Fetch Latest Data| D["API Request"]
    D -->|Get WO List| E["Database Pull"]
    E -->|Cache Locally| F["SQLite Storage"]
    F -->|Display to User| G["Work Order List"]
    
    B -->|No| H["Sync Mode: OFFLINE"]
    H -->|Load Local Cache| F
    F -->|Display Cached| G
    
    G -->|User Action:<br/>View/Update| I{Action Type?}
    
    I -->|Read Only| J["Retrieve Local Data"]
    J -->|Display| K["Show Information"]
    
    I -->|Create/Update| L["Create Local Queue"]
    L -->|Store in Sync Queue| M["Queue Table"]
    M -->|Show Confirmation| N["'Pending Sync' Badge"]
    
    N -->|User Offline Continue| O["More Changes"]
    O -->|Accumulate Queue| M
    
    M -->|Connection Restored| P{Back Online?}
    P -->|Yes| Q["Detect Connectivity"]
    Q -->|Start Sync Process| R["Process Queue Items"]
    R -->|For Each Item| S["Send to API"]
    S -->|API Response| T{Success?}
    T -->|No| U["Retry Logic<br/>with Exponential Backoff"]
    U -->|Max Retries?| V{Exceeded?}
    V -->|Yes| W["Mark as Failed"]
    V -->|No| R
    T -->|Yes| X["Remove from Queue"]
    X -->|Mark Synced| Y["Update Local Cache"]
    Y -->|Sync Complete?| Z{All Items Done?}
    Z -->|No| R
    Z -->|Yes| AA["Sync Complete ✓<br/>Remove Badges"]
    AA -->|Refresh UI| BB["Show Latest Data"]
```

---

## 5. Role-Based Access Control (RBAC) Flow

```mermaid
graph TD
    A["User Login"] -->|Submit Credentials| B["Authentication"]
    B -->|Verify Password| C{Auth Success?}
    C -->|No| D["Login Failed"]
    D -->|Retry| A
    
    C -->|Yes| E["Fetch User Record"]
    E -->|Get User Role| F["Retrieve Role"]
    F -->|Load Permissions| G["Get Role Permissions"]
    G -->|Create Session Token| H["JWT with Role Claims"]
    H -->|Store Locally| I["Session Storage"]
    I -->|Redirect| J["Dashboard"]
    
    J -->|User Navigate| K["Request Resource/API"]
    K -->|Attach JWT Token| L["HTTP Request"]
    L -->|Server Receive| M["Extract Token"]
    M -->|Verify Signature| N["JWT Validation"]
    N -->|Valid?| O{Token OK?}
    O -->|No| P["401 Unauthorized"]
    P -->|Redirect| A
    
    O -->|Yes| Q["Extract Role & Permissions"]
    Q -->|Check Required Permission| R{Has Permission?}
    R -->|No| S["403 Forbidden"]
    S -->|Show Error| T["Access Denied Page"]
    
    R -->|Yes| U["Execute Request"]
    U -->|Admin:| V["All Features"]
    U -->|Supervisor:| W["WO Management<br/>+ Approvals"]
    U -->|Staff:| X["Own WO Only<br/>+ Updates"]
    U -->|Manager:| Y["Reports + Analytics"]
    
    V -->|Return Data| Z["API Response"]
    W -->|Return Data| Z
    X -->|Return Data| Z
    Y -->|Return Data| Z
    Z -->|Update UI| AA["Render Based on<br/>Permissions"]
    AA -->|Completed| AB["User Interaction ✓"]
```

---

## 6. File Upload & Storage Flow

```mermaid
graph TD
    A["User in Work Order Detail"] -->|Tap Upload Icon| B["Camera/File Picker"]
    B -->|Mobile:<br/>Camera App| C["Capture Photo"]
    C -->|Or Select from Gallery| D["Choose Image"]
    D -->|Web:<br/>File Input| E["Select File"]
    
    E -->|File Selected| F["Validation"]
    F -->|Check:<br/>- File Type<br/>- File Size| G{Valid?}
    G -->|No| H["Show Error"]
    H -->|Re-select| B
    
    G -->|Yes| I["Show Upload Progress"]
    I -->|Prepare Metadata| J["Get File Info"]
    J -->|Create FormData| K["Include:<br/>- File<br/>- WO ID<br/>- Description"]
    
    K -->|Send to API| L["Backend Upload Endpoint"]
    L -->|Receive File| M["Validate Again"]
    M -->|Generate Unique Name| N["Create S3 Key"]
    N -->|Upload to S3| O["AWS S3"]
    O -->|File Stored| P["Get S3 URL"]
    P -->|Save DB Record| Q["Create work_order_attachment"]
    Q -->|Include:<br/>- S3 URL<br/>- File Metadata| R["Store in Database"]
    
    R -->|Return to Client| S["Success Response"]
    S -->|Update UI| T["Show Thumbnail"]
    T -->|Add to Gallery| U["Display in WO"]
    
    U -->|Show Photos| V["Before/After Compare"]
    V -->|Generate Report| W["Include Photos in PDF"]
    W -->|Download Document| X["File Download ✓"]
```

---

## 7. Analytics & Reporting Flow

```mermaid
graph TD
    A["User: Manager/Admin"] -->|Open Analytics| B["Analytics Dashboard"]
    B -->|Request Dashboard Data| C["Analytics Query"]
    C -->|Aggregate Data from DB| D["Query Multiple Tables"]
    
    D -->|Work Orders Table| E["Count & Filter"]
    E -->|- Total WOs<br/>- By Status<br/>- By Priority| F["Aggregate Results"]
    
    D -->|Assignments Table| G["Calculate Metrics"]
    G -->|- Avg Resolution Time<br/>- Completion Rate<br/>- Staff Performance| F
    
    D -->|User Activity| H["Analyze Trends"]
    H -->|- Busy Hours<br/>- Peak Days<br/>- Department Load| F
    
    F -->|Cache Results| I["Redis Cache<br/>5-min TTL"]
    I -->|Format Data| J["Prepare for UI"]
    J -->|Build Charts| K["Chart.js/Recharts"]
    
    K -->|Display KPIs| L["Widget Cards:<br/>- Total WOs<br/>- Completion %<br/>- Avg Time"]
    K -->|Display Graphs| M["Charts:<br/>- Status Distribution<br/>- Timeline Graph<br/>- Staff Rankings"]
    
    L -->|User Export Report| N["Select Date Range"]
    M -->|Choose Report Type| N
    N -->|Generate PDF| O["PDFKit/ReportLab"]
    O -->|Include:<br/>- Charts<br/>- Metrics<br/>- Tables| P["Build PDF"]
    P -->|Download| Q["Report Downloaded ✓"]
```

---

## 8. System Overview - Component Interaction

```mermaid
graph TB
    subgraph Frontend["Frontend Layer"]
        WEB["Web App<br/>Next.js + React"]
        MOBILE["Mobile App<br/>Flutter"]
    end
    
    subgraph Backend["Backend Layer"]
        API["API Routes<br/>Next.js"]
        AUTH["Auth Service<br/>NextAuth.js"]
        FILE["File Service<br/>S3 Integration"]
    end
    
    subgraph RealTime["Real-time Layer"]
        WS["WebSocket<br/>Socket.io"]
        PUSH["Push Notifications<br/>Firebase"]
    end
    
    subgraph Database["Data Layer"]
        DB["PostgreSQL<br/>Main DB"]
        CACHE["Redis<br/>Cache"]
        STORAGE["AWS S3<br/>File Storage"]
    end
    
    subgraph External["External Services"]
        FIREBASE["Firebase"]
        AWS["AWS"]
    end
    
    WEB -->|HTTP/REST| API
    MOBILE -->|HTTP/REST| API
    WEB -->|WebSocket| WS
    MOBILE -->|WebSocket| WS
    
    API -->|Query/Update| DB
    API -->|Cache Check| CACHE
    API -->|Auth Verify| AUTH
    API -->|Upload/Download| FILE
    
    WS -->|Broadcast| WEB
    WS -->|Broadcast| MOBILE
    
    PUSH -->|Send FCM| MOBILE
    PUSH -->|Send Web Push| WEB
    
    FILE -->|Upload To| STORAGE
    STORAGE -->|S3 Bucket| AWS
    
    PUSH -->|Cloud Messaging| FIREBASE
    
    AUTH -->|Verify| DB
```

---

## Flow Summary Table

| Flow | Key Stakeholders | Triggers | Output |
|------|------------------|----------|--------|
| **Work Order Creation** | Staff, Supervisor, Admin | User action | Work order in PENDING status |
| **Assignment** | System, Supervisor, Staff | WO created or reassign | Staff assigned, notification sent |
| **Real-time Update** | All users | Event triggered | Live UI update, push notification |
| **Offline Sync** | Mobile app, Backend | Connection change | Queued actions synced |
| **RBAC** | Auth system, Database | User login | Permissions-based access |
| **File Upload** | User, API, S3 | User selects file | File stored, DB record created |
| **Analytics** | Manager, Admin | View request | Dashboard data, PDF report |

---

## User Journey by Role

### 👨‍💼 Staff Teknis
```
Login → Dashboard → Accept WO → Start Work → Capture Photos →
Add Comments → Mark Complete → Submit → Sync (if offline) ✓
```

### 👔 Supervisor
```
Login → Dashboard → Review WOs → Create Assignment →
Monitor Progress → Approve Completion → View Analytics ✓
```

### 👨‍💻 Admin
```
Login → Dashboard → Manage Users/Roles → Assign Permissions →
Monitor System → View Reports → Generate Analytics ✓
```

### 📊 Manager
```
Login → Analytics Dashboard → View KPIs → Export Reports →
Monitor Team Performance → Make Decisions ✓
```
