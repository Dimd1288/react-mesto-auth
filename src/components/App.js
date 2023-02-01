import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import Login from "./Login";
import Register from "./Register";

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ isOpened: false });
    const [currentUser, setCurrentUser] = useState('');
    const [cards, setCards] = useState([]);
    const [deletingCard, setDeletingCard] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(true);

    useEffect(() => {
        api.getUser()
            .then(res => setCurrentUser(res))
            .catch(err => console.log(`От сервера вернулась ошибка ${err}`));
        api.getInitialCards().then(res => {
            setCards(res.map(item => ({
                _id: item._id,
                name: item.name,
                link: item.link,
                likes: item.likes,
                owner: item.owner
            })));
        })
    }, []);

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(!isEditProfilePopupOpen);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(!isAddPlacePopupOpen);
    }

    function handleDeletePlaceClick(card) {
        setDeletingCard(card);
        setDeletePlacePopupOpen(!isDeletePlacePopupOpen);
    }

    function handleCardClick(card) {
        setSelectedCard({ ...card, isOpened: true });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(`От сервера вернулась ошибка ${err}`));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) => state.filter((c) => c._id !== card._id));
            closeAllPopups();
        })
            .catch(err => console.log(`От сервера вернулась ошибка ${err}`));
    }

    function handleUpdateUser(userInfo) {
        api.patchUser(userInfo)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            }
            )
            .catch(err => console.log(`От сервера вернулась ошибка ${err}`));
    }

    function handleUpdateAvatar(avatar) {
        api.patchAvatar(avatar)
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(`От сервера вернулась ошибка ${err}`));
    }

    function handleAddPlaceSubmit(cardData) {
        api.postNewCard(cardData).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        }
        )
            .catch(err => console.log(`От сервера вернулась ошибка ${err}`));
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setDeletePlacePopupOpen(false);
        setSelectedCard({ isOpened: false });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <div className="page">
                    <Routes>
                        <Route path="/sign-up" element={<Register />} />
                        <Route path="/sign-in" element={<Login isLoggedIn={isLoggedIn} />} />
                        <Route path="/" element={isLoggedIn ?
                            <>
                                <Header link="/sign-in" email="sfsdf" linkName="Выход" loggedIn={isLoggedIn} />
                                <Main
                                    cards={cards}
                                    onEditAvatar={handleEditAvatarClick}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onCardClick={handleCardClick}
                                    onCardLike={handleCardLike}
                                    onBasketClick={handleDeletePlaceClick}
                                />
                                <Footer />
                                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                                <DeletePlacePopup isOpen={isDeletePlacePopupOpen} onClose={closeAllPopups} card={deletingCard} onCardDelete={handleCardDelete} />
                                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                            </>
                            : <Navigate to="/sign-in" replace />} />

                    </Routes>
                </div>
            </div>

        </CurrentUserContext.Provider>
    );
}

export default App;