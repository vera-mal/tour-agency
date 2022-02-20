package touragency.backend.service;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import touragency.backend.entity.Client;
import touragency.backend.entity.Role;
import touragency.backend.repository.UserRepository;

import java.util.List;

public class TestMyUserDetailsService {
    UserRepository userRepository;
    MyUserDetailsService userDetailsService;

    @BeforeEach
    public void init() {
        userRepository = Mockito.mock(UserRepository.class);
        userDetailsService = new MyUserDetailsService(userRepository);
    }

    @Test
    public void testLoadUserByUsernameWhenNull() {
        Mockito.when(userRepository.findByLogin(Mockito.any())).thenReturn(null);
        Assertions.assertThrows(UsernameNotFoundException.class, () -> userDetailsService.loadUserByUsername("smpas"));
    }

    @Test
    public void testLoadUserByUsernameWhenNotNull() {
        List<Role> roles = List.of(new Role(1L, "user"));
        Mockito.when(userRepository.findByLogin(Mockito.any())).thenReturn(new Client(null, null, null,
                "smpas", "1234", null, null, roles));
        UserDetails userDetails = userDetailsService.loadUserByUsername("smpas");
        Assertions.assertEquals("smpas", userDetails.getUsername());
        Assertions.assertEquals("1234", userDetails.getPassword());
        Assertions.assertTrue(userDetails.getAuthorities().contains(new SimpleGrantedAuthority(roles.get(0).getName())));
    }
}
