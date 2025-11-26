import React, { useState } from "react";
import '../styles/header.css'
import ProcessText from "../functions/LanguageSorter";

function HeaderButton() {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalOpen = () => setShowModal(true);

  return (
    <div className="header-modal">
      <button className="open-modal-button" onClick={handleModalOpen}>{ProcessText("Talk to an expert***Hablar con un experto")}</button>

      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-left">
              <h2>Título del Modal</h2>
              <p>Este es un párrafo con texto informativo.</p>
            </div>
            <div className="modal-right">
              <form>
                <input type="text" placeholder="Input 1" />
                <input type="text" placeholder="Input 2" />
                <input type="text" placeholder="Input 3" />
                <input type="text" placeholder="Input 4" />
                <input type="text" placeholder="Input 5" />
                <textarea placeholder="Escribe algo..." />
                <button type="submit">Enviar</button>
              </form>
            </div>
            <button className="close-btn" onClick={handleModalClose}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderButton;
