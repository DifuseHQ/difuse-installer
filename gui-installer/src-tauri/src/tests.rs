use crate::utils::filter_virtual_interfaces;

#[test]
pub fn test_read_dir() {
    // it's 2 because I have 2 physical interfaces on my machine
    assert_eq!(2, filter_virtual_interfaces().len())
}
