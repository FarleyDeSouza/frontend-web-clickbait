import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#0f0f0f',
    flex: 1,
  },
  header: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
  },
  logo: {
    color: '#ffd700',
    fontSize: 20,
    fontWeight: '700',
  },
  productContainer: {
    flex: 1,
    padding: 20,
  },

  /* Cards / Image */
  h48: { height: 192 },
  bgGray100: { backgroundColor: '#1a1a1a' },
  rounded: { borderRadius: 8 },
  mb3: { marginBottom: 12 },
  overflowHidden: { overflow: 'hidden' },
  textGray400: { color: '#9ca3af' },
  objectContain: { resizeMode: 'contain' },
  hFull: { height: '100%' },
  textGray600: { color: '#d1d5db' },

  /* Layout */
  flex: { display: 'flex' },
  itemsCenter: { alignItems: 'center' },
  justifyCenter: { justifyContent: 'center' },
  justifyBetween: { justifyContent: 'space-between' },
  flex1: { flex: 1 },
  mt3: { marginTop: 12 },
  textSm: { fontSize: 14 },
  textXl: { fontSize: 20 },
  fontBold: { fontWeight: '700' },
  px3: { paddingHorizontal: 12 },
  py1: { paddingVertical: 4 },
  border: { borderWidth: 1, borderColor: '#374151' },

  /* Form */
  form: { width: '100%' },
  formTitle: {
    color: '#ffd700',
    marginBottom: 16,
    fontSize: 20,
    fontWeight: '600',
  },
  label: { marginBottom: 8 },
  labelText: { fontWeight: '600', color: '#ffd700', marginBottom: 6 },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 6,
    padding: 12,
    color: 'white',
  },
  textarea: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 6,
    padding: 12,
    color: 'white',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  /* Buttons */
  button: {
    backgroundColor: '#ffd700',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { fontWeight: '600', color: '#0f0f0f' },

  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#374151',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonOutlineText: { color: 'white' },
});
