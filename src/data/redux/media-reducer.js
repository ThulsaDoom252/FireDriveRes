import {createSlice} from "@reduxjs/toolkit";
import {
    audioOnly,
    audioRef,
    audioRoute,
    defaultRef,
    delay,
    error,
    imageRoute,
    imagesOnly,
    imagesRef,
    listMode,
    renameMode,
    rootRoute,
    sortByDate,
    sortBySize,
    sortyByName,
    uploadMode,
    uploadSuccess,
    videosOnly,
    videosRef,
    videosRoute
} from "../refs";
import {deleteObject, getDownloadURL, getMetadata, listAll, ref, updateMetadata, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase";
import {handleAlert, setSortType} from "./fireDrive-reducer";

const mediaSlice = createSlice({
    name: 'media-slice',
    initialState: {
        fetchMediaSet: false,
        currentRoute: '',
        imagesLoading: false,
        videosLoading: false,
        audioLoading: false,
        deletingMediaIndex: null,
        isAllMediaDeleted: false,
        imageSet: [],
        videoSet: [],
        audioRefSet: [],
        currentMediaSet: [],
        isLoading: false,
        currentMediaPlaying: null,
        testArr: [],
        searchResult: [],
        newMediaName: null,
        editingMediaName: null,
        editMediaNameMode: false,
        audioSetStatus: false,
        editMediaMode: false,
        selectedMedia: [],
        paginatedMedia: [],
        hoveredMediaIndex: null,
        audioSet: [],
        currentTrackIndex: 0,
        currentSearchRequest: '',
        isCurrentTrackPlaying: false,
        isAudioInitialized: false,
        currentAudioDuration: 0,
        deletedTrackIndex: null,
        totalAudioDuration: 0,
        uploadingMode: false,
    },
    reducers: {
        setCurrentSearchRequest(state, action) {
            state.currentSearchRequest = action.payload
        },
        searchMediaAC(state, action) {
            state.searchResult = state.currentMediaSet.filter(media => media.name.toLowerCase().includes(action.payload))
        },
        refreshSearchResults(state, action) {
            state.searchResult = state.searchResult.filter(item => item.url !== action.payload)
        },
        clearSearch(state) {
            state.searchResult = []
        },
        toggleRoute(state, action) {
            state.currentRoute = action.payload
        },
        toggleEditMediaNameMode(state, action) {
            state.editMediaNameMode = action.payload
        },
        toggleMediaLoading(state, action) {
            const {mediaType, toggle} = action.payload
            switch (mediaType) {
                case imagesRef:
                    state.imagesLoading = toggle
                    break;
                case videosRef:
                    state.videosLoading = toggle
                    break;
                case  audioRef:
                    state.audioLoading = toggle

            }
        },
        toggleMediaSet(state, action) {
            const {mediaType, mediaData} = action.payload
            switch (mediaType) {
                case imagesRef:
                    state.imageSet = [...mediaData]
                    break;
                case  videosRef:
                    state.videoSet = [...mediaData]
                    break;
                case  audioRef:
                    state.audioRefSet = [...mediaData]
            }
        },
        setDeletingMediaIndex(state, action) {
            state.deletingMediaIndex = action.payload
        },
        toggleAudioSet(state, action) {
            state.audioSet = [...action.payload]
        },
        toggleImagesSet(state, action) {
            state.imageSet = [...action.payload]
        },
        toggleCurrentMediaSet(state, action) {
            state.currentMediaSet = [...action.payload]
        },

        toggleVideosSet(state, action) {
            state.videoSet = [...action.payload]
        },
        clearMediaSet(state, action) {
            const {route} = action.payload
            switch (route) {
                case imageRoute:
                    state.imageSet = []
                    break;
                case videosRoute:
                    state.videoSet = []
                    break;
                case audioRoute:
                    state.audioRefSet = []
                    state.audioSet = []
                    break;
                default:
                    void 0
            }
        },
        toggleTestArr(state, action) {
            state.testArr = [...action.payload]
        },
        toggleAudioSetStatus(state, action) {
            state.audioSetStatus = action.payload
        },
        updateMediaSet(state, action) {
            const {mediaRoute, modifiedUploadedMedia} = action.payload
            switch (mediaRoute) {
                case imageRoute:
                    state.imageSet = [...state.imageSet, ...modifiedUploadedMedia]
                    break;
                case videosRoute:
                    state.videoSet = [...state.videoSet, ...modifiedUploadedMedia]
                    break;
                case audioRoute:
                    state.audioRefSet = [...state.audioRefSet, ...modifiedUploadedMedia]
                    state.audioSet = [...state.audioSet, ...modifiedUploadedMedia]
                    break;
            }
        },

        filterMediaSet(state, action) {
            const {url, route} = action.payload
            switch (route) {
                case imageRoute:
                    state.imageSet = state.imageSet.filter(media => media.url !== url)
                    break;
                case videosRoute:
                    state.videoSet = state.videoSet.filter(video => video.url !== url)
                    break;
                case audioRoute:
                    state.audioRefSet = state.audioRefSet.filter(audioRef => audioRef.url !== url)
                    state.audioSet = state.audioSet.filter(audio => audio.url !== url)
                    break;
                default:
                    void 0
            }
        },

        toggleLoading(state, action) {
            state.isLoading = action.payload
        }
        ,
        setCurrentMediaPlaying(state, action) {
            state.currentMediaPlaying = action.payload
        }
        ,
        toggleMediaFetch(state, action) {
            state.fetchMediaSet = action.payload
        }
        ,
        changeListedMediaName(state, action) {
            const {mediaType} = action.payload;
            switch (mediaType) {
                case audioRef:
                    state.audioSet = state.audioSet.map(audio => audio.newName !== undefined ? {
                            ...audio,
                            name: audio.newName
                        }
                        : audio)
                    state.audioRefSet = state.audioSet.map(audioRef => audioRef.newName !== undefined ? {
                            ...audioRef,
                            name: audioRef.newName
                        }
                        : audioRef)
                    break;
                case imagesRef:
                    state.imageSet = state.imageSet.map(image => image.newName !== undefined ? {
                            ...image,
                            name: image.newName
                        }
                        : image)
                    break;
                case videosRef:
                    state.videoSet = state.videoSet.map(image => image.newName !== undefined ? {
                            ...image,
                            name: image.newName
                        }
                        : image)
                    break;
                default:
                    void 0
            }
        },

        changeMediaOldNameToNew(state, action) {
            const {newName, oldName, route} = action.payload
            switch (route) {
                case imageRoute:
                    state.imageSet = state.imageSet.map((image) => image.name === oldName ? {
                        ...image,
                        name: newName,
                    } : image)
                    break;
                case videosRoute:
                    state.videoSet = state.videoSet.map(video => video.name === oldName ? {
                        ...video,
                        name: newName,
                    } : video)
                    break;
                case audioRoute:
                    state.audioRefSet = state.audioRefSet.map(audio => audio.name === oldName ? {
                        ...audio,
                        name: newName,
                    } : audio)
                    state.audioSet = state.audioSet = state.audioSet.map((audio) => audio.name === oldName ? {
                        ...audio,
                        name: newName
                    } : audio)
            }
        },
        changeMediaName(state, action) {
            state.newMediaName = action.payload
        }
        ,
        setMediaNameAC(state, action) {
            state.editingMediaName = action.payload
        }
        ,
        toggleAudioInitializationStatus(state, action) {
            state.isAudioInitialized = action.toggle
        }
        ,
        toggleCurrentTrackPlaying(state, action) {
            state.isCurrentTrackPlaying = action.payload
        }
        ,
        setCurrentTrackIndex(state, action) {
            state.currentTrackIndex = action.payload
        }
        ,
        pushSelectedMedia(state, action) {
            state.selectedMedia = [...state.selectedMedia, action.payload]
        }
        ,
        setAllMediaDeletedState(state, action) {
            state.isAllMediaDeleted = action.payload
        },
        setDeletedTrackIndex(state, action) {
            state.deletedTrackIndex = action.payload
        },
        addAudioIndex(state) {
            const updatedAudioRefs = state.audioRefSet.map((audioRef, index) => ({...audioRef, index}));
            // const updatedAudioSet = state.audioSet.map((audio, index) => ({...audio, index}))
            state.audioRefSet = updatedAudioRefs;
            // state.audioSet = updatedAudioSet;
        },
        filterSelectedMedia(state, action) {
            state.selectedMedia.filter(item => item !== action.payload)
        }
        ,
        setTotalAudioDuration(state, action) {
            state.totalAudioDuration = action.payload
        }
        ,
        clearSelectedMedia(state) {
            state.selectedMedia = []
        }
        ,
        toggleEditMode(state, action) {
            state.editMediaMode = action.payload
        }
        ,
        setHoveredMediaIndex(state, action) {
            state.hoveredMediaIndex = action.payload
        }
        ,
        togglePaginatedMedia(state, action) {
            state.paginatedMedia = action.payload
        }
        ,
        setCurrentAudioDuration(state, action) {
            state.currentAudioDuration = action.payload
        }
        ,
        toggleUploadingMode(state, action) {
            state.uploadingMode = action.payload
        }
    },
})

export default mediaSlice.reducer

export const {
    setCurrentSearchRequest,
    searchMediaAC,
    toggleMediaLoading,
    refreshSearchResults,
    clearSearch,
    toggleRoute,
    toggleUploadingMode,
    toggleImagesSet,
    toggleVideosSet,
    toggleMediaSet,
    clearMediaSet,
    toggleLoading,
    changeMediaOldNameToNew,
    toggleEditMediaNameMode,
    toggleAudioInitializationStatus,
    setCurrentMediaPlaying,
    toggleMediaFetch,
    changeListedMediaName,
    toggleCurrentMediaSet,
    changeMediaName,
    updateMediaSet,
    setMediaNameAC,
    setDeletingMediaIndex,
    toggleCurrentTrackPlaying,
    toggleAudioSet,
    setCurrentTrackIndex,
    pushSelectedMedia,
    setDeletedTrackIndex,
    toggleTestArr,
    filterMediaSet,
    addAudioIndex,
    filterSelectedMedia,
    setAllMediaDeletedState,
    setTotalAudioDuration,
    clearSelectedMedia,
    toggleEditMode,
    setHoveredMediaIndex,
    togglePaginatedMedia,
    setCurrentAudioDuration
} = mediaSlice.actions;

export const handleCurrentMediaSet = ({dispatch}, mediaData, sortType, route) => {
    if (mediaData) {
        dispatch(toggleMediaFetch(true))
        if (route === audioRoute) {
            const [audioRefs, audio] = mediaData
            const sortedAudioRefs = sortMediaSet([...audioRefs], sortType)
            const sortedAudio = sortMediaSet([...audio], sortType)
            const indexAudioRefs = addIndexKeyToMedia(sortedAudioRefs)
            dispatch(toggleCurrentMediaSet(indexAudioRefs))
            dispatch(toggleAudioSet(sortedAudio))
        } else {
            const sortedMediaType = sortMediaSet([...mediaData], sortType)
            dispatch(toggleCurrentMediaSet(sortedMediaType))
        }
        dispatch(toggleMediaFetch(false))
    } else {
        void 0
    }
}

export const addIndexKeyToMedia = (array) => {
    const modifiedArray = array.map((media, index) => ({...media, index}))
    return modifiedArray
}

export const sortMediaSet = (array, sortType) => {
    switch (sortType) {
        case sortByDate:
            array.sort((a, b) => a.date.localeCompare(b.date))
            break;
        case sortyByName:
            array.sort((a, b) => a.name.localeCompare(b.name))
            break;
        case sortBySize:
            array.sort((a, b) => b.size - a.size)
            break;
        default:
            void 0
    }
    return array
}

export const searchMedia = ({dispatch}, text) => {
    if (text === '') {
        dispatch(clearSearch())
    } else {
        const searchRequest = text.toLowerCase()
        dispatch(searchMediaAC(searchRequest))
    }
}

export const setMediaName = ({dispatch}, name) => {
    dispatch(changeMediaName(name))
    dispatch(setMediaNameAC(name))
}

export const setPaginatedMedia = ({dispatch}, currentMediaSet, firstMediaIndex, lastMediaIndex) => {
    let paginatedMedia = currentMediaSet.slice(firstMediaIndex, lastMediaIndex)
    dispatch(togglePaginatedMedia(paginatedMedia))
}

const filterMediaData = (array, mode) => {
    let modifiedMedia
    switch (mode) {
        case listMode: {
            modifiedMedia = array.map(([url, metadata], index) => ({
                url,
                name: metadata.name,
                date: metadata.timeCreated,
                newName: metadata.cacheControl,
                oldName: metadata.name,
                size: metadata.size,
            }))
        }
            break;
        case uploadMode:
            modifiedMedia = [{
                url: array[0],
                date: array[1].timeCreated,
                name: array[1].name,
                newName: array[1].cacheControl,
                oldName: array[1].name,
                size: array[1].size,
            }]
            break;
    }
    return modifiedMedia
}

export const listMedia = async ({dispatch}, userName, mediaType, mix, sortType) => {
    dispatch(toggleMediaLoading({mediaType, toggle: true}))
    try {
        const data = await listAll(ref(storage, `${userName}/${mediaType}`)).catch(error => console.log(error))
        const results = await Promise.all(data.items.map((item) => Promise.all([getDownloadURL(item), getMetadata(item)])))
        const mediaData = filterMediaData(results, listMode)
        if (mediaType === audioRef) {
            const sortedAudio = sortMediaSet(mediaData, sortType)
            dispatch(toggleAudioSet(sortedAudio))
        }
        mix && mediaData.sort(() => Math.random() - 0.5)
        dispatch(toggleMediaSet({mediaType, mediaData}))
        dispatch(changeListedMediaName({mediaType}))
        // mediaType === audioRef && dispatch(addAudioIndex())
    } catch (e) {

    }
    dispatch(toggleMediaLoading({mediaType, toggle: false}))

}


export const uploadMedia = async ({dispatch}, e, route, userName) => {
    try {
        const allowedTypes = {
            [imageRoute]: imagesOnly,
            [videosRoute]: videosOnly,
            [audioRoute]: audioOnly,
            [rootRoute]: [] // Пустой массив разрешенных типов файлов для остальных маршрутов
        };
        const files = Array.from(e.target.files);
        // Фильтруем файлы по разрешенным типам для текущего маршрута
        const filteredFiles = files.filter(file => allowedTypes[route].includes(file.type));
        // Если есть файлы, подходящие по типу
        if (filteredFiles.length > 0) {
            dispatch(toggleLoading(true));
            dispatch(toggleUploadingMode(true))
            await Promise.all(filteredFiles.map(async (file) => {
                const fileRef = ref(storage, `${userName}/${route === videosRoute ? videosRef
                    : route === imageRoute ? imagesRef
                        : route === audioRoute ? audioRef
                            : defaultRef}/${file.name}`);
                await uploadBytes(fileRef, file);
                const uploadedMedia = await Promise.all([
                    getDownloadURL(fileRef), getMetadata(fileRef)
                ])
                const modifiedUploadedMedia = filterMediaData(uploadedMedia, uploadMode)
                dispatch(updateMediaSet({mediaRoute: route, modifiedUploadedMedia}))
                audioRoute && dispatch(addAudioIndex())
            }));

            // await listAllMedia({dispatch}, route, userName);
            handleAlert({dispatch}, uploadSuccess)
            dispatch(toggleLoading(false))
        }
    } catch (e) {

    }
};

export const deleteMedia = async ({dispatch}, route, url, userName, index, searchMode) => {
    debugger
    return new Promise(async (resolve) => {
        dispatch(setDeletingMediaIndex(index))
        const mediaRef = ref(storage, url);
        await deleteObject(mediaRef)
        index && setDeletedTrackIndex(index)
        debugger
        dispatch(filterMediaSet({url, route}))
        dispatch(setDeletingMediaIndex(null))
        searchMode && dispatch(refreshSearchResults(url))
        resolve()
    })
};

export const deleteSelectedMedia = ({dispatch}, e, route, array, userName) => {
    array.forEach(item => deleteMedia({dispatch}, e, route, item.url, userName))
    dispatch(clearSelectedMedia())
}

export const deleteAllMedia = async ({dispatch}, array, route) => {
    let urlsToDelete = []
    try {
        array.forEach(media => urlsToDelete.push(media.url))
        for (let url of urlsToDelete) {
            let refToDelete = ref(storage, url)
            await deleteObject(refToDelete)
            dispatch(clearSearch())
        }
        dispatch(setAllMediaDeletedState(true))
        dispatch(clearMediaSet({route}))
        dispatch(setAllMediaDeletedState(false))
    } catch (e) {
        handleAlert({dispatch}, error, e.toString())
    }
}

export const renameMedia = async ({dispatch}, oldName, newName, route, cacheControl, originalName, userName, isAudio) => {
    const imagesPage = route === imageRoute
    const videosPage = route === videosRoute
    const audioPage = route === audioRoute
    const folder = imagesPage ? imagesRef : videosPage ? videosRef : audioPage ? audioRef : defaultRef
    const oldRef = ref(storage, `${userName}/${folder}/${cacheControl !== undefined ? originalName : oldName}`)
    const updatedName = `${newName !== '' ? newName : oldName}`
    if (updatedName !== oldName) {
        try {
            await updateMetadata(oldRef, {cacheControl: updatedName})
            dispatch(changeMediaOldNameToNew({oldName, newName, route}))
        } catch (error) {
            console.log(`rename media error ${error}`)
        }
    }
}

export const handleSelectedMedia = ({dispatch}, e, selectedMediaArr, media) => {
    if (selectedMediaArr.includes(media)) {
        dispatch(filterSelectedMedia(media))
    } else {
        dispatch(pushSelectedMedia(media))
    }
}

export const goToPreviousTrack = async ({dispatch}, currentTrackIndex) => {
    dispatch(setCurrentTrackIndex(currentTrackIndex !== 0 && currentTrackIndex - 1));
    dispatch(toggleCurrentTrackPlaying(false))
    await delay(1000)
    dispatch(toggleCurrentTrackPlaying(true))
};

export const goToNextTrack = async ({dispatch}, currentTrackIndex, audioSet) => {
    dispatch(setCurrentTrackIndex(currentTrackIndex !== audioSet.length && currentTrackIndex + 1));
    dispatch(toggleCurrentTrackPlaying(false));
    await delay(1000)
    dispatch(toggleCurrentTrackPlaying(true))
};

export const handleSearch = (searchRequest, {dispatch}) => {
    dispatch(setCurrentSearchRequest(searchRequest))
    searchMedia({dispatch}, searchRequest)
}






