import Gemini from "./components/Gemini";
import { Container } from "@chakra-ui/react";
import "./App.css";

function App() {
	return (
		<Container
			maxW={"none"}
			className="App"
			bgColor={"black"}
			bgGradient={"linear(to-r, gray.800, red.700)"}
			color={"black"}
		>
			<Gemini />
		</Container>
	);
}

export default App;
