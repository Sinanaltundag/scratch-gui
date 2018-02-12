import PropTypes from 'prop-types';
import React from 'react';

import VM from 'scratch-vm';

import SpriteLibrary from '../../containers/sprite-library.jsx';
import BackdropLibrary from '../../containers/backdrop-library.jsx';
import SpriteSelectorComponent from '../sprite-selector/sprite-selector.jsx';
import StageSelector from '../../containers/stage-selector.jsx';

import styles from './target-pane.css';

/*
 * Pane that contains the sprite selector, sprite info, stage selector,
 * and the new sprite, costume and backdrop buttons
 * @param {object} props Props for the component
 * @returns {React.Component} rendered component
 */
const TargetPane = ({
    backdropLibraryVisible,
    editingTarget,
    spriteLibraryVisible,
    onChangeSpriteDirection,
    onChangeSpriteName,
    onChangeSpriteSize,
    onChangeSpriteVisibility,
    onChangeSpriteX,
    onChangeSpriteY,
    onDeleteSprite,
    onDuplicateSprite,
    onMouseOutSprite,
    onMouseOverSprite,
    onNewSpriteClick,
    onRequestCloseSpriteLibrary,
    onRequestCloseBackdropLibrary,
    onSelectSprite,
    raiseSprites,
    stage,
    sprites,
    vm,
    ...componentProps
}) => (
    <div
        className={styles.targetPane}
        {...componentProps}
    >

        <SpriteSelectorComponent
            raised={raiseSprites}
            selectedId={editingTarget}
            sprites={sprites}
            onChangeSpriteDirection={onChangeSpriteDirection}
            onChangeSpriteName={onChangeSpriteName}
            onChangeSpriteSize={onChangeSpriteSize}
            onChangeSpriteVisibility={onChangeSpriteVisibility}
            onChangeSpriteX={onChangeSpriteX}
            onChangeSpriteY={onChangeSpriteY}
            onDeleteSprite={onDeleteSprite}
            onDuplicateSprite={onDuplicateSprite}
            onMouseOutSprite={onMouseOutSprite}
            onMouseOverSprite={onMouseOverSprite}
            onNewSpriteClick={onNewSpriteClick}
            onSelectSprite={onSelectSprite}
        />
        <div className={styles.stageSelectorWrapper}>
            {stage.id && <StageSelector
                assetId={
                    stage.costume &&
                    stage.costume.assetId
                }
                backdropCount={stage.costumeCount}
                id={stage.id}
                selected={stage.id === editingTarget}
                onSelect={onSelectSprite}
            />}
            <div>
                {spriteLibraryVisible ? (
                    <SpriteLibrary
                        vm={vm}
                        onRequestClose={onRequestCloseSpriteLibrary}
                    />
                ) : null}
                {backdropLibraryVisible ? (
                    <BackdropLibrary
                        vm={vm}
                        onRequestClose={onRequestCloseBackdropLibrary}
                    />
                ) : null}
            </div>
        </div>
    </div>
);

const spriteShape = PropTypes.shape({
    costume: PropTypes.shape({
        url: PropTypes.string,
        name: PropTypes.string.isRequired,
        bitmapResolution: PropTypes.number.isRequired,
        rotationCenterX: PropTypes.number.isRequired,
        rotationCenterY: PropTypes.number.isRequired
    }),
    direction: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    order: PropTypes.number,
    size: PropTypes.number,
    visibility: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number
});

TargetPane.propTypes = {
    backdropLibraryVisible: PropTypes.bool,
    editingTarget: PropTypes.string,
    extensionLibraryVisible: PropTypes.bool,
    onChangeSpriteDirection: PropTypes.func,
    onChangeSpriteName: PropTypes.func,
    onChangeSpriteSize: PropTypes.func,
    onChangeSpriteVisibility: PropTypes.func,
    onChangeSpriteX: PropTypes.func,
    onChangeSpriteY: PropTypes.func,
    onDeleteSprite: PropTypes.func,
    onDuplicateSprite: PropTypes.func,
    onMouseOutSprite: PropTypes.func,
    onMouseOverSprite: PropTypes.func,
    onNewSpriteClick: PropTypes.func,
    onRequestCloseBackdropLibrary: PropTypes.func,
    onRequestCloseExtensionLibrary: PropTypes.func,
    onRequestCloseSpriteLibrary: PropTypes.func,
    onSelectSprite: PropTypes.func,
    raiseSprites: PropTypes.bool,
    spriteLibraryVisible: PropTypes.bool,
    sprites: PropTypes.objectOf(spriteShape),
    stage: spriteShape,
    vm: PropTypes.instanceOf(VM)
};

export default TargetPane;
