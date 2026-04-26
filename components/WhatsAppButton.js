// Componente super simples do botão flutuante.
// Isolar coisas assim em arquivos próprios mantém o código muito limpo!
export default function WhatsAppButton() {
  return (
    <a 
      // Link já engatilhado com uma mensagem educada de introdução
      href="https://wa.me/5531988861776?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20novo%20site%20da%20Ag%C3%AAncia%20Santa%20Edwirges." 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-float"
      title="Fale com nossa equipe no WhatsApp!"
    >
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" 
        alt="WhatsApp" 
        style={{ width: '40px', height: '40px', filter: 'brightness(0) invert(1)'}}
        // Truque de CSS acima converte um svg preto para ficar totalmente branco destacando no verde
      />
    </a>
  );
}
