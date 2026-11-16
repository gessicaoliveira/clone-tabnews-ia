import Curtir from "./curtir";

const versos = [
  "é como se soubesse",
  "tudo o que vejo",
  "a mordida no seu lábio",
  "sua mão na minha pele",
  "o tempo de antes",
  "o presente",
  "e o depois",
  "pra mim",
  "quando você volta",
];

export default function Home() {
  return (
    <main>
      <h1>instante</h1>

      <div className="poema">
        {versos.map((verso) => (
          <p key={verso}>{verso}</p>
        ))}
        <p className="fim">é sempre o melhor</p>
      </div>

      <Curtir />
    </main>
  );
}
