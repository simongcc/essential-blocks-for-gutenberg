
                                    <div className="testimonial_list">
                                        <RichText
                                            tagName="p"
                                            value={ newItem.body_content }
                                            className="details"
                                        />
                                        <RichText
                                            tagName="h6"
                                            value={ newItem.title }
                                            className="name"
                                        />
                                        <RichText
                                            tagName="span"
                                            value={ newItem.designation }
                                        />
                                        
                                        <p>Image: 
                                        {/* { testimonialListImage( item.imageUrl, item.imageAlt) } */}


                                        { ! newItem.imageID ? (

                                            <div className="button-container">
                                                <MediaUpload
                                                    onSelect={ onSelectImage }
                                                    type="image"
                                                    value={ newItem.imageID }
                                                    render = { ( { open } ) => (
                                                        <Button
                                                            className= { "button button-large" }
                                                            onClick={ open }
                                                        >
                                                            { icons.upload }
                                                            { __('Upload Image', 'ugb')}
                                                        </Button>
                                                )}
                                                >
                                                </MediaUpload>
                                            </div>

                                            ) : (
                                                    <p class="image-wrapper">
                                                        <img
                                                            src={ newItem.imageUrl }
                                                            alt={ newItem.imageAlt }
                                                        />

                                                        { isSelected ? (

                                                            <Button
                                                                className="remove-image"
                                                                onClick={ onRemoveImage }
                                                            >
                                                                { icons.remove }
                                                            </Button>

                                                        ) : null }

                                                    </p>
                                                )
                                            }

                                        </p>
                                        
                                        <button onClick={() => handleItemDelete(newItem.id)}>
                                            { icons.minus }
                                        </button>
                                    </div>