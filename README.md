# Drag and Drop Cards

A playful drag-and-drop card interface featuring cat images.

## Thought Process

In developing this application, I focused on creating a modular, efficient, and user-friendly interface. Here's a breakdown of my approach:

### 1. Component Structure

I divided the application into three main components:

- `Card`: Represents individual document cards with cat images.
- `CardGrid`: Manages the layout and drag-and-drop functionality of the cards.
- `SaveStatus`: Displays the current saving status and time since last save.

This modular approach enhances readability, maintainability, and reusability of the code.

### 2. Custom Hook - useDocuments

I created a custom hook to centraliz state management logic:

- Handles loading and saving of data.
- Implements the required 5-second interval for automatic saving.
- Manages `isLoading` and `isSaving` states to provide user feedback.
- Utilizes localStorage for data persistence across page reloads.

This hook encapsulates all data-related operations, keeping components focused on rendering and user interactions.

### 3. Mock Service Worker (MSW)

I used MSW to mock API calls, simulating server interactions without a backend. This approach allowed for easy testing and development of the frontend in isolation.

### 4. localStorage for Persistence

In conjunction with MSW, I used localStorage to persist data. This ensures that user changes are maintained across page reloads, enhancing the user experience.

### 5. Drag and Drop Implementation

I implemented the drag-and-drop functionality using the `react-dnd` and `react-dnd-html5-backend` packages. This solution provides a smooth and efficient way to reorder cards within the `CardGrid` component.

Additionally, I've included a backup implementation in `CardGrid.backup.tsx` which uses `react-beautiful-dnd`. This serves as an alternative approach.

### 6. TypeScript Integration

As specified, I used TypeScript throughout the project to add static typing, improving code quality and developer experience.

This architecture allows for a clear separation of concerns, with data management handled by the custom hook, UI rendering by the components, and API simulation by MSW.

## How to Run the App

Follow these steps to run the Zania Cat Card Dragger on your local machine:

1. **Clone the repository:**
   git clone [repository-url]
   cd zania

2. **Install dependencies:**
   npm install

3. **Start the development server:**
   npm start

4. **Open the application:**
   Open your web browser and navigate to `http://localhost:3000`.
