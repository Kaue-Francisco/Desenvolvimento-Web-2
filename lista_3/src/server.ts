import { connectionDb, conn } from './ConfigDatabase';
import { agendamentoForm } from './utils/interfaces';

export const insertData = async (formData: agendamentoForm) => {
    const data_pessoa = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone
    };

    const data_agendamento = {
        data_agenda: formData.data_agenda,
        horario: formData.horario
    };

    conn.query('INSERT INTO pessoa SET ?', data_pessoa, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dado:', err);
            return;
        }
        console.log('Dado inserido com sucesso:', result);
    });

    conn.query('INSERT INTO agendamento SET ?', data_agendamento, (err, result) => {
        if (err) {
            console.error('Erro ao inserir dado:', err);
            return;
        }
        console.log('Dado inserido com sucesso:', result);
    });

}

export const getData = () => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT p.nome, p.email, p.telefone, a.data_agenda, a.horario FROM pessoa as p, agendamento as a WHERE p.id_pessoa = a.id_agendamento', (err, result) => {
            if (err) {
                console.error('Erro ao exibir o dado:', err);
                reject(err);
            } else {
                console.log('Dado exibido com sucesso');
                resolve(result);
            }
        });
    });
}