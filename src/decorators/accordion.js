import React, { Component as ReactComponent } from 'react'
export default ( OriginalComponent ) => class Accordion extends ReactComponent {
    state = {
        openArticleId: null
    }

    toggleOpenArticle = openArticleId => ev => {
        this.setState({
            openArticleId: openArticleId === this.state.openArticleId ? null : openArticleId
        })
    }

    render(){
        return <OriginalComponent
            {...this.props}
            { ...this.state }
            toggleOpenArticle = { this.toggleOpenArticle }
            openArticleId = { this.state.openArticleId }
        />
    }
}