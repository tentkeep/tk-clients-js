import { GalleryUser } from '../../index.js'

function canEdit(galleryUser: GalleryUser) {
  return galleryUser.roles?.find((r) => r === 'creator' || r === 'owner')
}

export default {
  canEdit,
}
