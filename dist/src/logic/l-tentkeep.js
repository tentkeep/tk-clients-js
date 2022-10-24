function canEdit(galleryUser) {
    return galleryUser.roles?.find((r) => r === 'creator' || r === 'owner');
}
export default {
    canEdit,
};
//# sourceMappingURL=l-tentkeep.js.map