# Pixel Art Drawing Mobile Web Application - Requirements Document

## 1. Core Problem & Value Proposition

**Problem**: Digital artists, hobbyists, game developers, and creative learners need an accessible, mobile-optimized tool to create pixel art without installing desktop software or dealing with complex interfaces.

**Value Proposition**: A lightweight, intuitive mobile-first web application that enables users to create, edit, and export pixel art directly in their smartphone browser. The tool democratizes pixel art creation by removing technical barriers while providing essential features optimized specifically for mobile touch interactions.

**Target Users**:
- Mobile indie game developers creating sprites on-the-go
- Digital artists exploring retro aesthetics from smartphones
- Students learning digital art fundamentals on mobile devices
- Hobbyists creating avatars, icons, and social media content during commutes
\n---

## 2. Product Requirements Document (PRD)

### 2.1 Goals\n- Provide an intuitive pixel-by-pixel drawing experience optimized for smartphone screens (320px-480px)\n- Enable one-handed operation for core drawing functions
- Deliver responsive performance for customizable canvas sizes on mobile devices
- Support essential drawing tools with thumb-friendly controls
- Implement simplified layer system (maximum 5 layers) for mobile memory constraints
- Provide streamlined color palette with quick-access swatches
- Enable artwork export in PNG format\n- Ensure all UI elements are accessible within thumb reach zones
- Minimize drawer height to maximize canvas visibility
- Support portrait orientation as primary mode
- Allow users to move selected pixels or drawn elements

### 2.2 Non-Goals
- Desktop optimization (mobile-first approach)
- Landscape mode as primary orientation
- Complex multi-layer compositions (>5 layers)
- Advanced color management features
- Animation or frame-by-frame editing
- Real-time collaboration features
- User accounts or cloud storage
- Native mobile app versions
- Marquee selection tool
- Lasso selection tool
- Hand/pan tool as separate tool

### 2.3 User Personas

**Persona 1: Mobile Commuter Artist**
- Age: 25, creates pixel art during subway rides
- Device: iPhone 13 (390×844px)
- Needs: One-handed operation, quick tool access, simple interface
- Pain points: Limited screen space, need to hold phone with one hand
\n**Persona 2: Mobile Game Developer**
- Age: 30, sketches game sprites during breaks
- Device: Samsung Galaxy S21 (360×800px)
- Needs: Fast sprite creation, easy export, basic editing tools
- Pain points: Complex UIs difficult to use on small screens

**Persona 3: Mobile Hobbyist**
- Age: 22, creates icons while waiting\n- Device: iPhone SE (375×667px)
- Needs: Immediate access, no learning curve, shareable results
- Pain points: Wants quick creativity without setup friction

### 2.4 User Journeys

**Journey 1: Quick Icon Creation on Phone**
1. User opens app on smartphone during commute
2. Selects desired canvas size from customizable options
3. Sees canvas optimized for portrait mode
4. Taps pencil tool from bottom drawer
5. Draws with thumb on lower canvas area
6. Swipes up drawer to access color swatches
7. Continues drawing with one hand
8. Taps Export button
9. Total time: 3-5 minutes

**Journey 2: Simple Sprite with Layers and Movement**
1. User opens app on phone
2. Creates background layer
3. Adds character layer
4. Uses move tool to reposition drawn elements
5. Toggles layer visibility to check composition
6. Adjusts layer opacity\n7. Exports final sprite
8. Total time: 10-15 minutes

### 2.5 Functional Requirements

#### Canvas Management
- **FR-1**: Display pixel grid with customizable dimensions (user can input custom width and height)
- **FR-2**: Provide preset canvas size options: 16×16, 32×32, 64×64, 128×128\n- **FR-3**: Canvas positioned in upper 50% of screen for thumb reach
- **FR-4**: Support zoom levels: 100%, 200%, 400%
- **FR-5**: Canvas size selector in drawer with large touch targets
- **FR-6**: Grid lines toggleable via drawer button
- **FR-7**: Allow users to change canvas size during editing (with confirmation to prevent data loss)

#### Drawing Tools
- **FR-8**: Pencil tool - primary drawing tool
- **FR-9**: Eraser tool - remove pixels
- **FR-10**: Fill tool - flood fill with contiguous mode only
- **FR-11**: Eyedropper tool - long press gesture (800ms)
- **FR-12**: Line tool - draw straight lines
- **FR-13**: Move tool - select and move drawn pixels or elements
- **FR-14**: Tool selection via bottom drawer with 56×56px buttons
- **FR-15**: Active tool highlighted with visual indicator

#### Move Tool Functionality
- **FR-16**: Move tool allows users to select any drawn line or pixel group
- **FR-17**: Selected area highlighted with visual indicator
- **FR-18**: Drag gesture to move selected pixels to new position
- **FR-19**: Tap outside selection to deselect
- **FR-20**: Move operation supports undo/redo\n
#### Simplified Layer System
- **FR-21**: Maximum 5 layers (mobile memory constraint)
- **FR-22**: Create new layer button (56×56px)
- **FR-23**: Delete layer with confirmation\n- **FR-24**: Layer visibility toggle
- **FR-25**: Layer opacity slider (0-100%)
- **FR-26**: Active layer indicator
- **FR-27**: Layer thumbnails (40×40px)
- **FR-28**: Simplified blend modes: Normal, Multiply, Overlay only

#### Streamlined Color System
- **FR-29**: 8 quick-access color swatches (56×56px each)
- **FR-30**: Current color indicator (56×56px)
- **FR-31**: Basic color picker with hex input
- **FR-32**: Recently used colors (4 slots)
- **FR-33**: Transparency option
\n#### Navigation
- **FR-34**: Pan canvas - two-finger drag gesture
- **FR-35**: Zoom - pinch gesture
- **FR-36**: Reset view button
\n#### History
- **FR-37**: Undo button (56×56px) - 10 steps maximum
- **FR-38**: Redo button (56×56px) - 10 steps maximum
- **FR-39**: Undo/redo via swipe gestures (optional)

#### Export
- **FR-40**: Export PNG button (120×56px)
- **FR-41**: Clear canvas button with confirmation
- **FR-42**: Auto-save to browser storage

#### Mobile-Optimized UI
- **FR-43**: Bottom drawer interface (maximum 30vh height)
- **FR-44**: Drawer toggle button (56×56px floating action button)
- **FR-45**: All buttons minimum 56×56px for thumb-friendly interaction
- **FR-46**: Drawer slides up from bottom with smooth animation
- **FR-47**: Canvas occupies 60-70% of viewport height
- **FR-48**: Portrait orientation as primary mode
- **FR-49**: Prevent accidental page zoom during drawing
- **FR-50**: Haptic feedback for tool selection (if supported)

### 2.6 Non-Functional Requirements

#### Performance
- **NFR-1**: Canvas rendering within 80ms for customizable grid sizes on mobile
- **NFR-2**: Touch response within 16ms (60fps)\n- **NFR-3**: App load time under 2 seconds on 4G
- **NFR-4**: Memory usage under 50MB on mobile devices
- **NFR-5**: Battery-efficient rendering (minimize redraws)

#### Mobile Usability
- **NFR-6**: All interactive elements minimum 56×56px
- **NFR-7**: Thumb reach zone optimization for portrait mode
- **NFR-8**: One-handed operation for core functions
- **NFR-9**: Drawer height never exceeds 30vh
- **NFR-10**: Canvas always visible when drawer is open
\n#### Browser Support
- **NFR-11**: iOS Safari 14+, Chrome Mobile 90+, Firefox Mobile 88+
- **NFR-12**: Responsive design for 320px-480px width (portrait)
- **NFR-13**: Touch event support required\n\n#### Accessibility
- **NFR-14**: High contrast mode support
- **NFR-15**: Screen reader compatibility
- **NFR-16**: Minimum 4.5:1 color contrast for UI elements
\n### 2.7 Success Metrics
- **Engagement**: Average mobile session duration > 8 minutes
- **Completion**: 70%+ of users export at least one image
- **Performance**: 95th percentile touch latency < 30ms
- **Usability**: 90%+ of users complete drawing without frustration
- **One-Handed Use**: 60%+ of users successfully create art one-handed
- **Layer Adoption**: 40%+ of users utilize multiple layers
- **Move Tool Usage**: 30%+ of users utilize move tool for repositioning

---

## 3. MVP Definition

### 3.1 MVP Included Features

**Core Drawing**:\n- Customizable canvas size (user input + presets: 16×16, 32×32, 64×64, 128×128)
- Pencil tool\n- Eraser tool
- Fill tool (contiguous mode only)
- Eyedropper tool (long press)
- Line tool\n- Move tool (select and move pixels)
\n**Simplified Layers**:
- Maximum 5 layers\n- Create/delete layer\n- Layer visibility toggle
- Layer opacity (0-100%)
- Blend modes: Normal, Multiply, Overlay\n- Layer thumbnails\n\n**Streamlined Colors**:
- 8 quick-access swatches
- Basic color picker
- 4 recently used colors
- Current color indicator
\n**Navigation**:
- Pan (two-finger drag)
- Zoom (pinch gesture)
- Zoom levels: 100%, 200%, 400%
\n**History**:
- Undo (10 steps)
- Redo (10 steps)
\n**Export**:
- Export PNG\n- Clear canvas
- Auto-save to browser storage

**Mobile UI**:
- Bottom drawer interface (max 30vh)
- 56×56px touch targets
- Portrait-optimized layout
- Floating action button for drawer toggle

### 3.2 MVP Excluded Features

- Marquee selection tool
- Lasso selection tool
- Hand/pan tool as separate tool (pan via two-finger drag)
- Transformation tools (rotate, flip)
- Advanced blend modes
- Custom palette management
- Dynamic brush modes
- Dithering tools
- Navigation preview window
- Landscape mode optimization
- More than 5 layers

### 3.3 MVP Success Criteria
- 80%+ of mobile users complete icon creation within 5 minutes
- 90%+ of users successfully operate with one hand
- 70%+ of users export at least one image
- Zero critical bugs in core drawing flow
- 60fps maintained during drawing on mid-range devices
- 30%+ of users successfully use move tool\n
---

## 4. Technical Architecture

### 4.1 Frontend Stack
- **Framework**: React 18+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Canvas**: HTML5 Canvas API
- **Build Tool**: Vite
- **Mobile Optimization**: Touch events, viewport configuration, CSS containment

### 4.2 State Management
- **Local State**: React useState for UI\n- **Canvas State**: Custom hook for pixel array (max 5 layers)
- **Layer State**: Simplified layer array\n- **Color State**: 8 swatches + 4 recent colors
- **History State**: 10-step undo/redo stack
- **Persistence**: localStorage for auto-save
- **Move Tool State**: Selected pixels coordinates and movement tracking

### 4.3 Data Models
\n```typescript
type Color = string; // hex format
type Pixel = Color;\ntype CanvasGrid = Pixel[][];
type Tool = 'pencil' | 'eraser' | 'fill' | 'eyedropper' | 'line' | 'move';
type BlendMode = 'normal' | 'multiply' | 'overlay';
\ninterface Layer {
  id: string;
  name: string;
  canvas: CanvasGrid;
  visible: boolean;
  opacity: number; // 0-100\n  blendMode: BlendMode;
}\n
interface Selection {
  pixels: {x: number, y: number}[];
  active: boolean;
}\n
interface AppState {
  layers: Layer[]; // max 5\n  activeLayerId: string;\n  currentTool: Tool;
  currentColor: Color;
  quickSwatches: Color[]; // 8 colors
  recentColors: Color[]; // 4 colors
  history: AppState[]; // 10 steps
  historyIndex: number;
  canvasSize: {width: number, height: number}; // customizable
  drawerOpen: boolean;
  zoom: number; // 1, 2, 4\n  selection: Selection;
}\n```

---

## 5. Mobile UI Layout Specification

### 5.1 Portrait Layout Structure

**Screen Division**:
1. **Canvas Area** (60% viewport height)
   - Centered pixel grid with customizable size
   - Touch-optimized for thumb reach
   - Upper screen positioning

2. **Drawer Toggle FAB** (bottom-right, 56×56px)
   - Always visible\n   - Opens/closes drawer
\n3. **Bottom Drawer** (slides up, max 30vh)
   - Tool buttons (56×56px each)
   - Color swatches (56×56px each)
   - Layer controls\n   - Action buttons
   - Canvas size selector

### 5.2 Drawer Layout

**Section 1: Tools** (horizontal scroll)
- Pencil, Eraser, Fill, Line, Eyedropper, Move
- Each 56×56px\n- Active tool highlighted

**Section 2: Colors** (2 rows)
- Row 1: 8 quick swatches (56×56px)\n- Row 2: Current color + 4 recent colors
\n**Section 3: Canvas Settings** (collapsible)
- Canvas size input (width × height)
- Preset size buttons (16×16, 32×32, 64×64, 128×128)
- Grid toggle\n
**Section 4: Layers** (collapsible)
- Layer list (max 5)\n- Thumbnails (40×40px)
- Visibility toggle
- Opacity slider

**Section 5: Actions** (bottom row)
- Undo (56×56px)
- Redo (56×56px)
- Export (120×56px)
- Clear (56×56px)
\n### 5.3 Thumb Reach Zones

- **Primary Zone** (bottom 30%): Most-used tools
- **Secondary Zone** (middle 40%): Canvas\n- **Tertiary Zone** (top 30%): Less frequent actions

---
\n## 6. Mobile-Specific Optimizations

### 6.1 Touch Interactions
- **Single Tap**: Draw/select\n- **Long Press** (800ms): Eyedropper
- **Two-Finger Drag**: Pan canvas
- **Pinch**: Zoom in/out
- **Swipe Up**: Open drawer
- **Swipe Down**: Close drawer
- **Drag (Move Tool)**: Move selected pixels

### 6.2 Viewport Configuration
\n```html
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no\" />
<meta name=\"apple-mobile-web-app-capable\" content=\"yes\" />
<meta name=\"mobile-web-app-capable\" content=\"yes\" />
```\n
### 6.3 Performance Optimizations

- Debounced canvas redraws
- RequestAnimationFrame for smooth interactions
- Lazy loading for layer thumbnails
- Minimal DOM updates
- CSS containment for drawer\n- Optimized rendering for customizable canvas sizes

---
\n## 7. Implementation Roadmap

### Phase 1: Mobile Core (Week 1-2)
- Mobile-optimized canvas rendering with customizable size
- Bottom drawer interface
- Pencil and eraser tools
- Touch interaction handling
- Canvas size selector UI

### Phase 2: Essential Tools (Week 3)\n- Fill tool\n- Line tool
- Eyedropper (long press)
- Move tool (select and move pixels)
- Tool selection UI
\n### Phase 3: Simplified Layers (Week 4)\n- Layer creation/deletion (max 5)
- Layer visibility\n- Layer opacity
- Basic blend modes
\n### Phase 4: Color System (Week 5)
- 8 quick swatches
- Color picker\n- Recent colors
- Current color indicator

### Phase 5: Navigation & History (Week 6)
- Pan and zoom gestures
- Undo/redo (10 steps)
- Auto-save
\n### Phase 6: Export & Polish (Week 7)
- PNG export
- Clear canvas
- UI refinements
- Performance optimization

### Phase 7: Testing & Launch (Week 8)
- Mobile device testing
- User testing (15+ participants)
- Bug fixes
- Launch\n
---

## 8. Next Steps

1. **Validate Mobile-First Scope**: Confirm simplified feature set with stakeholders
2. **Create Mobile Mockups**: Design portrait-optimized UI wireframes
3. **Set Up Development Environment**: Initialize React + TypeScript project
4. **Begin Phase 1**: Start with mobile canvas and drawer implementation
5. **Establish Testing Strategy**: Define mobile device test matrix
6. **Plan User Testing**: Recruit 15-20 mobile beta testers
\n---

**Document Version**: 7.0  
**Last Updated**: 2026-01-16  
**Status**: Mobile-Optimized MVP Ready for Development  
**Key Changes**: Added customizable canvas size functionality with preset options (16×16, 32×32, 64×64, 128×128) and user input capability; removed marquee, lasso, and hand tools; added move tool allowing users to select and reposition drawn pixels or lines; updated data models, UI specifications, and implementation roadmap accordingly