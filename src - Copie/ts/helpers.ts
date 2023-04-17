function isElementVisible(element: HTMLElement): boolean {
    const box = element.getBoundingClientRect();
    return (box.top >= -box.height) && box.bottom <= (window.innerHeight + box.height);
}

export {
    isElementVisible,
};

